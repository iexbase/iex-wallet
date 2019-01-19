/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { takeWhile } from 'rxjs/operators';

// env
import env from '../../../../../environments';

// Providers
import { ElectronProvider } from '@providers/electron/electron';
import { WalletProvider } from '@providers/wallet/wallet';


@Component({
    selector: 'transaction-info',
    templateUrl: './transaction-info.component.html',
    styleUrls: ['./transaction-info.component.scss'],
})
export class TransactionInfoComponent implements OnInit, OnDestroy {
    /**
     * Transaction details
     *
     * @var any
     */
    @Input()
    transaction: any;

    /**
     * Token
     *
     * @var string
     */
    @Input()
    token: any;

    /**
     * Animation configure (Lottie)
     *
     * @var Object
     */
    lottieConfig: Object;

    /**
     * Interface details
     *
     * @var any
     */
    detail: any = {
        txID: null as string,
        status: false as boolean,
        block: undefined as number,
        timestamp: 0 as number,
        amount: 0 as number
    };

    /**
     * Stop update
     *
     * @var boolean
     */
    alive = true;

    /**
     * Use counter
     *
     * @var number
     */
    useCount = 0;

    /**
     * Max count update
     *
     * @var number
     */
    userMaxCount = 20;

    /**
     * Create a new TransactionInfoComponent object
     *
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {ElectronProvider} electronProvider - Electron provider
     */
    constructor(
        public snackBar: MatSnackBar,
        private walletProvider: WalletProvider,
        private electronProvider: ElectronProvider
    ) {
        //
    }


    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.lottieConfig = {
            path: 'assets/animations/ripple_loading_animation.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };

        this.detail = {
            txID: this.transaction.txID,
            timestamp: this.transaction['raw_data']['timestamp'],
            block: 0,
            status: false,
            amount: this.transaction['raw_data']['contract'][0]['parameter']['value']['amount']
        };

        TimerObservable.create(0, 5000).pipe(
            takeWhile(() => this.alive)).subscribe(() => {

            if (this.useCount > this.userMaxCount) {
                this.alive = false;
            }

            this.walletProvider.getTx(this.transaction.txID).then((tx: any) => {
                this.useCount++;
                this.detail.status = tx.confirmed;
                this.detail.block = tx.block;

                // If confirmation is received,
                // force updates.
                if (tx.confirmed === true) {
                    this.alive = false;
                }
            }).catch(() => {
                console.log('Transaction not found');
            });
        });
    }

    /**
     * Copy ID Transaction
     *
     * @return void
     */
    copyId(hash: string): void {
        this.electronProvider.writeToClipboard(`${env.explorer.url}/transaction/${hash}`);
        this.snackBar.open('Tronscan url for this transaction copied to the clipboard',
            null, {
                duration: 2000,
                panelClass: ['snackbar-theme-dialog']
            });
    }

    /**
     * Forced stop of running processes
     *
     * @return void
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
