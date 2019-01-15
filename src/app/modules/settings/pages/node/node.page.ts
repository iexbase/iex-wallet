/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";

import * as _ from "lodash";

// modules
import { AddNodeComponent } from "@modules/settings/components/add-node/add-node.component";

// Providers
import { TronProvider } from "@providers/tron/tron";

@Component({
    selector: 'node-page',
    templateUrl: './node.page.html',
    styleUrls: ['./node.page.scss'],
})
export class NodePage implements OnInit
{
    /**
     * Get a list of nodes
     *
     * @var any[]
     */
    public nodes: any[];

    /**
     * Filtered a list of nodes
     *
     * @var any[]
     */
    public filteredNodes: any[];

    /**
     * Empty nodes list
     *
     * @var boolean
     */
    public isEmptyList: boolean;

    /**
     *  Object creation NodePage
     *
     *  @param {TronProvider} tronProvider - Tron Provider
     *  @param {MatDialog} dialog - Service to open Material Design modal dialogs.
     *  @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        public tronProvider: TronProvider,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.initNodeClient()
    }

    /**
     * Prepare an nodes array
     *
     * @return void
     */
    private initNodeClient(): void
    {
        this.tronProvider
            .getNodes()
            .then(n => {
                this.isEmptyList = _.isEmpty(n);

                let nodes: object[] = [];
                _.each(n, (node, k: string) =>
                {
                    nodes.push({
                        name: _.isObject(node) ? node.name : node,
                        fullNode: _.isObject(node) ? node.fullNode : node,
                        solidityNode: _.isObject(node) ? node.solidityNode : node,
                        eventServer: _.isObject(node) ? node.eventServer : node,
                        nodeId: k,
                        isDelete: (!this.tronProvider.defaultNodes[k]) // Do not delete the default nodes
                    });
                });

                this.nodes = _.clone(nodes);
                this.filteredNodes = _.clone(this.nodes);
            });
    }

    /**
     * Delete node by "ID"
     *
     * @param {string} nodeId - ID node
     * @return void
     */
    deleteNode(nodeId: string): void
    {
        this.tronProvider.removeNode(nodeId)
            .then(() => {
                this.initNodeClient();
                this.snackBar.open('Node Successfully deleted', null, {
                    duration: 2000,
                    panelClass: ['snackbar-theme-dialog']
                });
            });
    }

    /**
     * Activate node
     *
     * @param {string} nodeId - id node
     * @return void
     */
    selectedNode(nodeId: string): void {
        this.tronProvider.selectNode(nodeId);
    }

    /**
     * Add new node
     *
     * @return void
     */
    addNode(): void
    {
        const dialogRef = this.dialog.open(AddNodeComponent, {
            width: '650px',
            panelClass: ['dialog-background']
        });

        dialogRef.afterClosed().subscribe(() => {
            this.initNodeClient()
        });
    }

    /**
     * Search handler
     *
     * @param {any} event - event search
     * @return void
     */
    public getItems(event: any): void
    {
        // set val to the value of the searchbar
        let val = event.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            let result = _.filter(this.nodes, item => {
                let name = item['name'];
                return _.includes(name.toLowerCase(), val.toLowerCase());
            });
            this.filteredNodes = result;
        } else {
            // Reset items back to all of the items
            this.initNodeClient();
        }
    }
}
