import {Component, OnInit} from "@angular/core";
import {TronProvider} from "@providers/tron/tron";
import {Update} from "@ngrx/entity";
import * as NodeActions from "@redux/nodes/nodes.actions";
import {Store} from "@ngrx/store";
import * as fromNode from "@redux/nodes/nodes.reducer";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AddNodeComponent} from "@modules/settings/components/add-node/add-node.component";
import * as _ from "lodash";

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
     *  @param {Store} store - Reactive service
     *  @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        public tronProvider: TronProvider,
        public dialog: MatDialog,
        protected store: Store<fromNode.State>,
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
    selectedNode(nodeId: string): void
    {
        this.tronProvider.selectNode(nodeId);
        const update: Update<any> = {
            id: 1,
            changes: {
                selectedNode: nodeId
            }
        };

        this.store.dispatch(
            new NodeActions.UpdateNode({node: update})
        )
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
}
