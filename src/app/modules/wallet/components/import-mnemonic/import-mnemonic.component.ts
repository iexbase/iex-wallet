/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

// Redux
import { AppState } from "@redux/index";
import * as WalletActions from "@redux/wallet/wallet.actions";

// Providers
import { WalletProvider } from "@providers/wallet/wallet";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MnemonicValidator} from "@validators/mnemonic";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'import-mnemonic',
    templateUrl: './import-mnemonic.component.html',
    styleUrls: ['./import-mnemonic.component.scss'],
})
export class ImportMnemonicComponent implements OnInit
{
    /**
     * Wallet Mnemonic Fields
     *
     * @var string
     */
    public importForm: FormGroup;

    /**
     * Go to account selection by "mnemonic"
     *
     * @var boolean
     */
    public nextToSelectWallet: boolean = false;

    /**
     * Test button click
     *
     * @var boolean
     */
    isDisabledButton: boolean = false;

    /**
     * List available addresses
     *
     * @var any[]
     */
    addresses = new BehaviorSubject<any[]>([]);

    /**
     * Object creation ImportMnemonicComponent
     *
     * @param {FormBuilder} fb - Creates an `AbstractControl` from a user-specified configuration.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Router} router - Router service
     * @param {Store} store - Reactive service
     * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        private fb: FormBuilder,
        private walletProvider: WalletProvider,
        private router: Router,
        private store: Store<AppState>,
        private snackBar: MatSnackBar
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
        this.importForm = this.fb.group({
            name: [null],
            privateKey: [null],
            address: [null],
            mnemonic: [null, Validators.compose([
                Validators.required,
                new MnemonicValidator(this.walletProvider).isValid
            ])],
        });
    }

    /**
     * Import wallet and get available addresses on "Mnemonic"
     *
     * @return void
     */
    goToImport(): void
    {
        this.nextToSelectWallet = true;
        for (let i = 0; i < 10; i++) {
            const address = this.walletProvider.addByMnemonic(
                this.importForm.controls['mnemonic'].value, i
            );
            this.addresses.next(this.addresses.getValue().concat([address]))
        }
    }

    /**
     *  Finish import
     *
     *  @param {any} walletId - Wallet details
     */
    finishImport(walletId: any)
    {
        this.isDisabledButton = true;
        // Filling in the remaining positions
        this.importForm.controls['privateKey'].setValue(walletId.privateKey);
        this.importForm.controls['address'].setValue(walletId.address.base58);

        this.walletProvider.importMnemonic(this.importForm.value)
            .then(wallet => {
                // Add to dispatcher
                this.store.dispatch(
                    new WalletActions.AddWallet({wallet: wallet})
                );

                // After the addition, we do a full update.
                this.walletProvider.fullUpdateAccount(walletId.address.base58).then(() => {});
                this.router.navigate(['/', 'wallet']);
            })
            .catch(err => {
                this.snackBar.open(err,null, {
                    duration: 3000,
                    panelClass: ['snackbar-theme-dialog']
                });
            });
    }

    /**
     * Come back
     *
     * @return void
     */
    onBack(): void {
        this.addresses.next([]);
        this.nextToSelectWallet = false;
    }
}
