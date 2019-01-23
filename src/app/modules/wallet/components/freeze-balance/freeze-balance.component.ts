/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import {AppState} from '@redux/index';


// Redux
import * as WalletActions from '@redux/wallet/wallet.actions';
import * as fromWallet from '@redux/wallet/wallet.reducer';

// Providers
import { TronProvider } from '@providers/tron/tron';
import { WalletProvider } from '@providers/wallet/wallet';

// Available Freeze types
enum FreezeType {
    FreezeBandwidth = 1,
    FreezeEnergy = 2,
    UnfreezeBandwidth = 3,
    UnfreezeEnergy = 4
}

@Component({
    selector: 'freeze-balance',
    templateUrl: './freeze-balance.component.html',
    styleUrls: ['./freeze-balance.component.scss'],
})
export class FreezeBalanceComponent implements OnInit {

    /**
     * Interest array
     *
     * @var any[]
     */
    percentage_options = [
        { label: '25%', value: 0.25 },
        { label: '50%', value: 0.5 },
        { label: '75%', value: 0.75 },
        { label: '100%', value: 1.00 }
    ] as any;

    /**
     * Fields list
     *
     * @var any
     */
    fields = {
        amount: undefined as number,
        resource: 'BANDWIDTH' as string
    };

    /**
     * Types of freezing
     *
     * @var any
     */
    freezes = [
        {
            key: 'BANDWIDTH',
            value: 'Bandwidth'
        },
        {
            key: 'ENERGY',
            value: 'Energy'
        }
    ];

    /**
     * Used total power
     *
     * @var number
     */
    userTotalPower = 0;

    /**
     * New total power
     *
     * @var number
     */
    newTotalPower = 0;

    /**
     * Expire Time frozen
     *
     * @var number
     */
    expireTime = 0;

    /**
     * Custom energy
     *
     * @var number
     */
    energyBalance = 0;

    /**
     * Expire Time Energy
     *
     * @var number
     */
    expireEnergyTime = 0;

    /**
     * Freeze Confirmation
     *
     * @var boolean
     */
    isConfirm = false;

    /**
     * Freeze Successful
     *
     * @var boolean
     */
    isSuccess = false;

    /**
     * Current time
     *
     * @var number | string
     */
    now = new Date();

    /**
     * Configuration Lottie
     *
     * @var any
     */
    lottieConfig: object;

    /**
     * Details of the selected wallet
     *
     * @var any
     */
    walletId: any;

    /**
     * Freeze type
     *
     * @var FreezeType
     */
    type: FreezeType;

    /**
     * Create a new FreezeBalanceComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {Store} store - Reactive provider
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {TronProvider} tron - TronProvider
     * @param {MatSnackBar} snackBar - Snack bar service
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<FreezeBalanceComponent>,
        protected store: Store<AppState>,
        private walletProvider: WalletProvider,
        private tron: TronProvider,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
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
        // Account balance update
        this.findAndUpdateBalance();
        this.walletProvider.getAccount(this.data.address).then((result: any) => {
            if (result['frozen'] && result['frozen'][0]['frozen_balance']) {
                this.userTotalPower = Number(this.tron.fromSun(result['frozen'][0]['frozen_balance']));
                this.newTotalPower = this.userTotalPower;
                this.expireTime = result['frozen'][0]['expire_time'];
            }

            if (result['account_resource'] && result['account_resource']['frozen_balance_for_energy']) {
                const resource = result['account_resource']['frozen_balance_for_energy'];
                this.energyBalance = this.tron.fromSun(resource['frozen_balance']);
                this.expireEnergyTime = resource['expire_time'];
            }
        });
    }

    /**
     * Change bandwidth value
     * Note: Only available for "Bandwidth"
     *
     * @return void
     */
    onChangePower() {
        this.newTotalPower = this.userTotalPower + Number(this.fields.amount);
    }

    /**
     * Change resource type
     *
     * @param {string} value - new resource (ENERGY or BANDWIDTH)
     * @return void
     */
    onResourceChange(value: string): void {
        this.fields.resource = value;
    }

    /**
     * Specify by percentage
     *
     * @param {number} percentage - percentage
     * @return void
     */
    onPercentageChange(percentage: number): void {
        const balance = this.walletId.balance / 1e6;
        this.fields.amount = Math.floor(balance * percentage);
    }

    /**
     *  We start the process of freezing the balance
     *
     *  @return void
     */
    goToFreeze(): void {
        this.tron.freezeBalance(this.fields.amount,
            3,
            this.fields.resource,
            this.data.address).then((freeze: any) => {

            this.walletProvider.signTx(freeze).then(signTx => {
                this.walletProvider.broadcastTx(signTx).then(broadcastTX => {
                    if (broadcastTX.result == true) {
                        // determine the type of freezing
                        this.type = this.fields.resource.toUpperCase() == 'BANDWIDTH'
                            ? FreezeType.FreezeBandwidth : FreezeType.FreezeEnergy;

                        this.isSuccess = true;
                    }
                });
            }).catch(err => {
                this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
            });
        }).catch(err => {
            this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
        });
    }

    /**
     *  We start the process of defrosting the balance
     *
     *  @param {string} resource - Resource type
     *  @returns {any | void}
     */
    goToUnfreeze(resource: string): any | void {
        if (!['ENERGY', 'BANDWIDTH'].includes(resource.toUpperCase())) {
            return this.snackBar.open('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
                null, {
                    duration: 2000,
                    panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
        }

        this.tron.unfreezeBalance(resource.toUpperCase(), this.data.address).then(unfreeze => {
            this.walletProvider.signTx(unfreeze)
                .then(signTX => {
                    this.walletProvider.broadcastTx(signTX).then(broadcastTX => {
                        if (broadcastTX.result == true) {
                            // determine the type of freezing
                            this.type = resource.toUpperCase() == 'BANDWIDTH'
                                ? FreezeType.UnfreezeBandwidth : FreezeType.UnfreezeEnergy;
                            this.isSuccess = true;
                        }
                    });
                })
                .catch(err => {
                    this.snackBar.open(err, null, {
                        duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                    });
                });
        }).catch(err => {
            this.snackBar.open(err,
                null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
        });
    }

    /**
     * Button activation status
     *
     * @return boolean
     */
    enabledBalance(): boolean {
        return this.fields.amount == 0 ||
            this.fields.amount == undefined ||
            !this.isConfirm ||
            Number(this.fields.amount) > Number(this.walletId.balance / 1e6);
    }

    /**
     * Balance update
     *
     * @return void
     */
    private findAndUpdateBalance(): void {
        this.walletProvider.getBalance(this.data.address)
            .then(balance => {
                this.walletProvider.updateWallet(this.data.address, {
                    balance
                }).then(result => {
                    const update: Update<any> = {
                        id: result.id,
                        changes: {
                            balance: result.balance
                        }
                    };

                    this.store.dispatch(
                        new WalletActions.UpdateWallet({ wallet: update})
                    );
                });
            });

        // Get find wallet by Address
        this.store.pipe(select(fromWallet.findWalletByAddress(this.data.address)))
            .subscribe(account => {
                this.walletId = account;
            });
    }

    /**
     * Close modal
     *
     * @return void
     */
    onClose(): void {
        this.dialogRef.close();
    }
}
