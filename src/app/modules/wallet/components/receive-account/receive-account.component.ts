/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Inject, OnInit} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

// env config
import env from "../../../../../environments";

// Providers
import { ConfigProvider } from "@providers/config/config";
import { ElectronProvider } from "@providers/electron/electron";

@Component({
    selector: 'receive-account',
    templateUrl: './receive-account.component.html',
    styleUrls: ['./receive-account.component.scss'],
})
export class ReceiveAccountComponent implements OnInit
{
    /**
     * Receive request
     *
     * @var boolean
     */
    isGenerateRequest:boolean = false;

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
        amount: <any> undefined,
        data: <string> "",
        token: <string> 'USD',
        address: <string> null
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
     * Copy TRON Address
     *
     * @return void
     */
    copyAddress(): void
    {
        this.electron.writeToClipboard(this.wallet.address);
        this.snackBar.open('Address copied to clipboard',
            null, {
                duration: 2000,
                panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
    }

    /**
     * Open address in "TronScan"
     *
     * @return void
     */
    addressInExplorer(): void {
        this.electron.openExternalLink(env.explorer.url + 'address/' + this.wallet.address);
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
