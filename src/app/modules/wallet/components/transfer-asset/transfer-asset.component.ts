/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Inject, OnInit} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";

// Redux
import * as WalletActions from "@redux/wallet/wallet.actions";
import { AppState } from "@redux/index";

// Providers
import {AddressProvider} from "@providers/address/address";
import {ConfigProvider} from "@providers/config/config";
import {ElectronProvider} from "@providers/electron/electron";
import {WalletProvider} from "@providers/wallet/wallet";
import {LocalStorage} from "ngx-webstorage";

@Component({
    selector: 'transfer-asset',
    templateUrl: './transfer-asset.component.html',
    styleUrls: ['./transfer-asset.component.scss'],
})
export class TransferAssetComponent implements OnInit
{
    /**
     * Filtered tokens
     *
     * @var string
     */
    @LocalStorage()
    filteredTokens: string;

    /**
     * Status of sending all balance
     *
     * @var boolean
     */
    useSendMax: boolean;

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
    wallet:any = {};

    /**
     * Transaction Confirmation Status
     *
     * @var boolean
     */
    isConfirmed: boolean = false;

    /**
     * Button lock status
     *
     * @var boolean
     */
    isButtonDisabled: boolean = false;

    /**
     * Transaction Successful Transaction Status
     *
     * @var boolean
     */
    isSuccess:boolean = false;

    /**
     * Status of receipt of transaction details
     *
     * @var boolean
     */
    isTransactionInfo: boolean = false;

    /**
     * Available fields to fill
     *
     * @var any
     */
    fields: any = {
        token: <string> 'TRX',
        toAddress: <string> '',
        amount: <number> 0
    };

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
    signedTransaction: any;

    /**
     * List available tokens
     *
     * @var any[]
     */
    listTokens = [];

    /**
     * Create a new TransferAssetComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {ElectronProvider} electron - Electron provider
     * @param {ConfigProvider} config - Config provider
     * @param {Store} store - Reactive service
     * @param {AddressProvider} addressProvider - Address provider
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<TransferAssetComponent>,
        private walletProvider: WalletProvider,
        public snackBar: MatSnackBar,
        public electron: ElectronProvider,
        public config: ConfigProvider,
        protected store: Store<AppState>,
        private addressProvider: AddressProvider,
        @Inject(MAT_DIALOG_DATA) public data: any) {

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
    ngOnInit()
    {
        this.wallet = this.data;

        // Balance update
        this.updateBalance();

        // Get tokens to exclude
        const userTokens = JSON.parse(this.filteredTokens) || [];
        // Additional filtering before output
        this.listTokens = this.data.tokens.filter(
            asset => userTokens.findIndex(key => key === asset.name) === -1)
            .filter(filter => filter.name != 'TRX');

        // move "TRX" to the first position
        this.listTokens.unshift({
            'name': 'TRX',
            'value': this.wallet.balance
        });
    }

    /**
     * Sending the entire amount
     *
     * @return void
     */
    public sendMax(): void
    {
        this.useSendMax = true;

        let item = this.listTokens.find(c =>
                c.name == this.fields.token
            );

        if(this.fields.token.toUpperCase() == 'TRX')
            this.fields.amount = item.value / 1e6;
        else {
            this.fields.amount = item.value;
        }
    }

    /**
     * Go to transaction confirmation
     *
     * @return void
     */
    public goToConfirm(): void
    {
        this.isButtonDisabled = true;

        this.walletProvider.createTx({
            tokenID: this.fields.token,
            amount: this.fields.amount,
            toAddress: this.fields.toAddress,
        }, this.wallet.address).then(result =>
        {
            this.signedTransaction = result;
            // confirmed data
            this.confirmDetails = {
                id: result.txID,
                timestamp: result.raw_data.timestamp,
                type: result.raw_data.contract[0].type,
                amount: result.raw_data.contract[0].parameter.value.amount,
                toAddress: result.raw_data.contract[0].parameter.value.to_address,
                ownerAddress: result.raw_data.contract[0].parameter.value.owner_address,
                token: this.fields.token,
                data: '~'
            };
            this.isButtonDisabled = false;
            this.isConfirmed = true;
        }).catch(err => {
            this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
            this.isButtonDisabled = false;
            this.isConfirmed = false;
        })
    }

    /**
     * Confirm and send transactions to the network
     *
     * @return void
     */
    public submitTransaction()
    {
        this.isButtonDisabled = true;
        this.isConfirmed = true;
        this.walletProvider.signTx(this.signedTransaction).then(signed =>
        {
            if('signature' in signed)
            {
                this.walletProvider.broadcastTx(signed).then(broadcast => {
                    if(broadcast.result == true) {
                        this.updateBalance();

                        this.isButtonDisabled = false;
                        this.isSuccess = true;

                        setTimeout(() => {
                            this.isTransactionInfo = true;
                        }, 2000)
                    }
                })
            }
        }).catch(err => {
            this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
        });
    }

    /**
     * Update balance
     *
     * @return void
     */
    updateBalance(): void
    {
        this.walletProvider.getBalance(this.wallet.address).then(result => {
            this.walletProvider.updateWallet(this.wallet.address, {
                balance: result
            }).then(result => {

                const update: Update<any> = {
                    id: this.wallet.id,
                    changes: {
                        balance: result.balance
                    }
                };

                this.store.dispatch(
                    new WalletActions.UpdateWallet({ wallet: update})
                );
            })
        });
    }

    /**
     * Sent button status
     *
     * @return boolean
     */
    enabledSend(): boolean {
        return this.fields.toAddress.length == 0 ||
            this.isButtonDisabled == true ||
            this.addressProvider.validateAddress(this.fields.toAddress) == false ||
            this.fields.amount == 0
    }

    /**
     * Come back
     *
     * @return void
     */
    onBack(): void {
        this.isConfirmed = false;
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
