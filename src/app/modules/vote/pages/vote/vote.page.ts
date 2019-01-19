/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { LocalStorage } from 'ngx-webstorage';
import { Observable } from 'rxjs';

// Redux
import * as fromWallet from '@redux/wallet/wallet.reducer';

// Modules
import { VoteDetailComponent } from '@modules/vote/components/vote-detail/vote-detail.component';

// Providers
import { VoteProvider } from '@providers/vote/vote';

@Component({
    selector: 'vote-page',
    templateUrl: './vote.page.html',
    styleUrls: ['./vote.page.scss']
})
export class VotePage implements OnInit {
    /**
     * Selected account
     *
     * @var string
     */
    @LocalStorage()
    activeAccount: string;

    /**
     * All wallets
     *
     * @var any[]
     */
    wallets: Observable<any[]>;

    /**
     * Wallet detail
     *
     * @var any
     */
    wallet: any = {
        color: null as string
    };

    /**
     * List votes
     *
     * @var any[]
     */
    public votes: any = [];

    /**
     * Filtered Votes List
     *
     * @var object[]
     */
    public filteredVotes: any = [];

    /**
     * Vote count
     *
     * @var number
     */
    public totalVotes = 0;

    /**
     * Empty votes list
     *
     * @var boolean
     */
    public isEmptyList: boolean;

    /**
     * Top-rated Token Information
     *
     * @var any
     */
    public topRating: any = {
        name: null as string,
        change_cycle: 0 as number
    };

    /**
     * Voting Status
     *
     * @var boolean
     */
    isLoading = true;

    /**
     * Object creation VotePage
     *
     * @param {Store} store - Reactive service
     * @param {MatDialog} dialog - Service to open Material Design modal dialogs.
     * @param {VoteProvider} voteProvider - Vote provider
     */
    constructor(
        private store: Store<fromWallet.State>,
        public dialog: MatDialog,
        private voteProvider: VoteProvider
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        // Get the data of the selected account
        this.initSelectedWallet();

        this.voteProvider.getVotesFromServer({})
            .then(vote => {
                this.isEmptyList = _.isEmpty(vote);

                this.votes = vote.res;
                this.filteredVotes = vote.res;
                this.totalVotes = vote.totalVotes;
                this.topRating = vote.topRating;

                // If everything is successful, hide the update.
                this.isLoading = false;
            });
    }

    /**
     * Getting the details of the selected team
     *
     * @param {any} item - vote detail
     * @return void
     */
    openDetail(item: any): void {
        const dialogRef = this.dialog.open(VoteDetailComponent, {
            width: '450px',
            panelClass: ['dialog-background', this.wallet.color],
            data: {
                wallet: this.wallet,
                vote: item
            }
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Get the selected wallet address from the section "Wallet"
     *
     * @return void
     */
    private initSelectedWallet(): void {
        // List all accounts
        this.wallets = this.store.pipe(select(fromWallet.selectAllWallets));
        // Check the presence of the recorded wallet
        // and activates the cached wallet
        this.activeAccount  && this.wallets.subscribe((data: any[]) => {
            // From the array, select the required
            const selected = data.filter(
                selected => selected.address == this.activeAccount
            );

            // If the array is not empty
            if (selected[0] && !_.isEmpty(selected)) {
                this.wallet = selected[0];
            }
        });
    }

    /**
     * Search handler
     *
     * @param {any} event - event search
     * @return void
     */
    public getItems(event: any): void {
        // set val to the value of the searchbar
        const val = event.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            const result = _.filter(this.votes, item => {
                const name = item['name'];
                return _.includes(name.toLowerCase(), val.toLowerCase());
            });
            this.filteredVotes = result;
        } else {
            // Reset items back to all of the items
            this.filteredVotes = this.votes;
        }
    }
}
