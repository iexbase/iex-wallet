/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

import { Store } from "@ngrx/store";

// Redux
import * as WalletActions from "@redux/wallet/wallet.actions";
import { AppState } from "@redux/index";


// Providers
import { Logger } from "@providers/logger/logger";
import { WalletProvider } from "@providers/wallet/wallet";

@Component({
    selector: 'import-wallet',
    templateUrl: './import-wallet.component.html',
    styleUrls: ['./import-wallet.component.scss'],
})
export class ImportWalletComponent implements OnInit
{
    /**
     * Private Key (ngModel)
     *
     * @var string
     */
    public privateKey: string;
    /**
     * Show advanced options
     *
     * @var boolean
     */
    hideOptional: boolean = true;

    /**
     * Test button click
     *
     * @var boolean
     */
    public disablePrivateKey: boolean = true;

    /**
     * Account name (Optional)
     *
     * @var string
     */
    public walletName: string = null;

    /**
     *  In case of successful import
     *
     *  @var boolean
     */
    public isSuccess: boolean = false;

    /**
     * Configuration animate lottie
     *
     * @var Object
     */
    lottieConfig: Object;

    /**
     * Object creation ImportWalletComponent
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive service
     * @param {Logger} logger - Log provider
     * @param {MatSnackBar} snackBar - is a service for displaying snack-bar notifications.
     */
    constructor(
        private walletProvider: WalletProvider,
        private store: Store<AppState>,
        private logger: Logger,
        public snackBar: MatSnackBar
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit(): void
    {
        this.lottieConfig = {
            path: 'assets/animations/smile/success.json',
            renderer: 'canvas',
            autoplay: true,
            loop: false
        };
    }

    /**
     * On the fly, check the entered data
     *
     * @return void | boolean
     */
    onChangeImportKey(): void | boolean
    {
        // Blocking the display of additional parameters
        // in case of an incorrect private key
        this.hideOptional = true;

        // Lock button in the case of an empty private key
        if (this.privateKey == undefined)
            return this.disablePrivateKey = true;

        // Lock the private key in case of exceeding
        // the length above 64 characters
        if (this.privateKey.length != 64)
            return this.disablePrivateKey = true;

        // Show advanced options
        this.hideOptional = false;
        // empty wallet name
        this.walletName = undefined;
        // Unlock button
        this.disablePrivateKey = false;
    }

    /**
     * Import account from private key
     *
     * @return void
     */
    doImportWallet(): void
    {
        this.walletName = this.defaultWalletName();
        this.walletProvider.importWallet(this.privateKey).then(result =>
        {
            // Add a new account to the storage of all accounts
            this.walletProvider.getBalance(result.address.base58).then(account =>
            {
                this.walletProvider.addWallet({
                    name: this.walletName,
                    privateKey: result.privateKey,
                    address: result.address.base58,
                    publicKey: result.publicKey,
                    balance: account
                }).then(finish => {
                    // Add to dispatcher
                    this.store.dispatch(
                        new WalletActions.AddWallet({wallet: finish})
                    );
                    this.isSuccess = true;
                }).catch(err => {
                    this.isSuccess = false;
                    this.snackBar.open(err,null, {
                        duration: 3000,
                        panelClass: ['snackbar-theme-dialog']
                    });
                });
            });
        }).catch(err => {
            this.snackBar.open(err,null, {
                duration: 3000,
                panelClass: ['snackbar-theme-dialog']
            });
            this.logger.error('Import: could not wallet', err);
        })
    }

    /**
     * Set default name
     *
     * @return string
     */
    private defaultWalletName(): string {
        return (this.walletName && this.walletName.length > 1
            ? this.walletName : 'Default wallet')
    }
}
