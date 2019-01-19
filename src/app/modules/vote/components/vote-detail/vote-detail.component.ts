/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

// Providers
import { VoteProvider } from '@providers/vote/vote';
import { WalletProvider } from '@providers/wallet/wallet';

// Objects of votes
const voteOptions: any = {
    1: 1,
    5: 5,
    10: 10,
    25: 25,
    50: 50,
    100: 100,
    500: 500,
    1000: 1000
};

@Component({
    selector: 'vote-detail',
    templateUrl: './vote-detail.component.html',
    styleUrls: ['./vote-detail.component.scss'],
})
export class VoteDetailComponent implements OnInit {
    /**
     * Animation configure (Lottie)
     *
     * @var Object
     */
    lottieConfig: Object;

    /**
     * Received data from the main source
     *
     * @var any
     */
    wallet: any = {};

    /**
     * Received data from the main source
     *
     * @var any
     */
    vote: any = {};

    /**
     * Voice List (for button)
     *
     * @var any[]
     */
    voteButton: any[];

    /**
     * Votes left
     *
     * @var number
     */
    totalRemaining = 0;

    /**
     * Indicated votes
     *
     * @var number
     */
    amountToVote = 0;

    /**
     *  Transaction Confirmation Status
     *
     * @var number
     */
    isConfirmed = false;

    /**
     * Details for confirmation
     *
     * @var any
     */
    confirmDetails: any = {};

    /**
     * Signature Details
     *
     * @var any
     */
    signedTransaction: any = {};

    /**
     * Transaction Successful Transaction Status
     *
     * @var boolean
     */
    isSuccess = false;

    /**
     * Button lock status
     *
     * @var boolean
     */
    isButtonDisabled = false;

    /**
     * Create a new VoteDetailComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {VoteProvider} voteProvider - Vote provider
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<VoteDetailComponent>,
        private voteProvider: VoteProvider,
        private snackBar: MatSnackBar,
        private walletProvider: WalletProvider,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.wallet = data.wallet;
        this.vote = data.vote;
        this.lottieConfig = {
            path: 'assets/animations/checked_done_.json',
            renderer: 'canvas',
            autoplay: true,
            loop: false
        };
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        // Putting an array for the voices button
        this.voteButton = Object.keys(voteOptions).map((voteKey) => {
            return voteOptions[voteKey];
        });
        this.totalRemaining = Number(this.wallet.tronPower);
    }

    /**
     * Increment vote count
     *
     * @param {number} quant - count
     * @return void
     */
    incrementVoteCount(quant: number): void {
        this.totalRemaining = Number(this.totalRemaining) - quant;
        this.amountToVote = this.amountToVote + quant;
    }

    /**
     * Clear vote
     *
     * @return void
     */
    clear(): void {
        this.amountToVote = 0;
        this.totalRemaining = Number(this.wallet.tronPower);
    }

    /**
     * All available vote
     *
     * @return void
     */
    allVoteCount(): void {
        this.amountToVote = Number(this.wallet.tronPower);
        this.totalRemaining = 0;
    }

    /**
     * Create vote transaction
     */
    createVote(): void {
        this.voteProvider.createVoteTx({
            srAddress: this.vote.address,
            voteCount: this.amountToVote
        }, this.wallet.address)
            .then((result: any) => {

                // We collect the most necessary parameters for display
                this.confirmDetails = {
                    id: result.txID,
                    timestamp: result.raw_data.timestamp,
                    type: result.raw_data.contract[0].type,
                    vote_count: result.raw_data.contract[0].parameter.value.votes[0].vote_count,
                    ownerAddress: result.raw_data.contract[0].parameter.value.owner_address,
                    data: '~'
                };
                this.signedTransaction = result;
                this.isConfirmed = true;

            })
            .catch(err => {
                this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
                this.isButtonDisabled = false;
                this.isConfirmed = false;
            });
    }

    /**
     * Sign and send a transaction to the network
     *
     * @return void
     */
    submitTransaction(): void {
        this.isButtonDisabled = true;
        this.isConfirmed = true;

        this.walletProvider.signTx(this.signedTransaction)
            .then(signed => {
                if ('signature' in signed) {
                    this.walletProvider.broadcastTx(signed).then(broadcast => {
                        if (broadcast.result == true) {
                            // Global update data
                            this.walletProvider.fullUpdateAccount(this.wallet.address).then(() => {});

                            this.isButtonDisabled = false;
                            this.isSuccess = true;
                            // After a few seconds, automatically close the window
                            setTimeout(() => {
                                this.onClose();
                            }, 2000);
                        }
                    });
                }
            })
            .catch(err => {
                this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
            });
    }

    /**
     * Close window
     *
     * @return void
     * */
    onClose(): void {
        this.dialogRef.close();
    }
}
