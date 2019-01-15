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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'import-wallet',
    templateUrl: './import-wallet.component.html',
    styleUrls: ['./import-wallet.component.scss'],
})
export class ImportWalletComponent implements OnInit
{
    /**
     * Wallet Import Fields
     *
     * @var string
     */
    public createForm: FormGroup;

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
     * @param {FormBuilder} fb - Creates an `AbstractControl` from a user-specified configuration.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive service
     * @param {Logger} logger - Log provider
     * @param {MatSnackBar} snackBar - is a service for displaying snack-bar notifications.
     */
    constructor(
        private fb: FormBuilder,
        private walletProvider: WalletProvider,
        private store: Store<AppState>,
        private logger: Logger,
        public snackBar: MatSnackBar
    ) {
        this.lottieConfig = {
            path: 'assets/animations/smile/success.json',
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
    ngOnInit(): void
    {
        this.createForm = this.fb.group({
            name: [null],
            privateKey: [null, Validators.compose([
                Validators.required,
                Validators.minLength(64),
                Validators.maxLength(64)
            ])],
        });
    }

    /**
     * Import account from private key
     *
     * @return void
     */
    doImportWallet(): void
    {
        this.walletProvider.importWallet(this.createForm.value)
            .then(wallet => {
                // Add to dispatcher
                this.store.dispatch(
                    new WalletActions.AddWallet({ wallet: wallet })
                );
                // After the addition, we do a full update.
                this.walletProvider.fullUpdateAccount(wallet.address).then(() => {});
                this.isSuccess = true;
            })
            .catch(err => {
                this.snackBar.open(err,null, {
                    duration: 3000,
                    panelClass: ['snackbar-theme-dialog']
                });
                this.logger.error('Import: could not wallet', err);
            });
    }
}
