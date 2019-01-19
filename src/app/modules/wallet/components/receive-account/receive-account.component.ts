/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

// env config
import env from '../../../../../environments';

// Providers
import { ConfigProvider } from '@providers/config/config';
import { ElectronProvider } from '@providers/electron/electron';

@Component({
    selector: 'receive-account',
    templateUrl: './receive-account.component.html',
    styleUrls: ['./receive-account.component.scss'],
})
export class ReceiveAccountComponent implements OnInit {
    /**
     * Receive request
     *
     * @var boolean
     */
    isGenerateRequest = false;

    /**
     * Current wallet id
     *
     * @var any
     */
    wallet: any;

    /**
     * List currencies
     *
     * @var any
     */
    currencies: any = [
        {key: 'USD', value: 'USD'},
        {key: 'EUR', value: 'EUR'},
        {key: 'TRX', value: 'TRX'}
    ];

    /**
     * Available fields
     *
     * @var any
     */
    fields = {
        amount: undefined as any,
        data: '' as string,
        token: 'USD' as string,
        address: null as string
    };

    /**
     * Object creation ReceiveAccountComponent
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {ElectronProvider} electron - Electron Provider
     * @param {ConfigProvider} config - Config Provider
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<ReceiveAccountComponent>,
        public snackBar: MatSnackBar,
        private electron: ElectronProvider,
        public config: ConfigProvider,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.wallet = this.data;
        this.fields.address = this.wallet.address;
    }

    /**
     * Change type currency
     *
     * @return void
     */
    onCurrencyChange(value: string): void {
        this.fields.token = value;
    }

    /**
     * Open address in "TronScan"
     *
     * @return void
     */
    addressInExplorer(): void {
        this.electron.openExternalLink(
            env.explorer.url + 'address/' + this.wallet.address
        );
    }

    /**
     * Send Tron address to Email
     *
     * @return void
     */
    emailAccount(): void {
        this.electron.openExternalLink(
            'mailto:?subject=iEXWallet TRON Address&body=My iEXWallet TRON address is: ' + this.wallet.address
        );
    }

    /**
     * Request for replenishment
     *
     * @return void
     */
    generateRequest(): void {
        this.isGenerateRequest = true;
    }

    /**
     * Come back
     *
     * @return void
     */
    back(): void {
        this.isGenerateRequest = false;
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
