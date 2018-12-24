/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

// Redux
import { AppState } from "@redux/index";
import * as WalletActions from "@redux/wallet/wallet.actions";

// Providers
import { WalletProvider } from "@providers/wallet/wallet";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'import-mnemonic',
    templateUrl: './import-mnemonic.component.html',
    styleUrls: ['./import-mnemonic.component.scss'],
})
export class ImportMnemonicComponent implements OnInit
{
    /**
     * Mnemonic (ngModel)
     *
     * @var string
     */
    mnemonic: string;

    /**
     * Availability status
     *
     * @var boolean
     */
    isMnemonic: boolean = true;

    /**
     * Show advanced options
     *
     * @var boolean
     */
    hideOptional: boolean = true;

    /**
     * Account name (Optional)
     *
     * @var string
     */
    public walletName: string;

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
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Router} router - Router service
     * @param {Store} store - Reactive service
     */
    constructor(
        private walletProvider: WalletProvider,
        private router: Router,
        private store: Store<AppState>,
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        // empty
    }

    /**
     * On the fly, check the entered data
     *
     * @return void | boolean
     */
    onChangeMnemonic(): void | boolean
    {
        if(this.disableButton()) {
            return this.hideOptional = true;
        }

        // Show advanced options
        this.hideOptional = false;
        // empty wallet name
        this.walletName = undefined;
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
            const address = this.walletProvider.addByMnemonic(this.mnemonic, i);
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
        this.walletName = this.defaultWalletName();

        this.walletProvider.addWallet({
            name: this.walletName,
            privateKey: walletId.privateKey,
            address: walletId.address.base58
        }).then(added => {
            // Add to dispatcher
            this.store.dispatch(
                new WalletActions.AddWallet({wallet: added})
            );

            // Redirect to Wallet
            this.router.navigate(['/', 'wallet']);
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

    /**
     * Button availability status
     *
     * @return boolean
     */
    disableButton(): boolean
    {
        this.validateMnemonic();
        return (
            !this.mnemonic ||
            !this.isMnemonic ||
            this.mnemonic.split(' ').length < 12 ||
            this.mnemonic.split(' ').length > 12
        )
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

    /**
     * Validation of entered values
     *
     * @return boolean | void
     */
    private validateMnemonic(): void | boolean {
        if (/^(\w+\s?)*\s*$/.test(this.mnemonic)) {
            return this.isMnemonic = true;
        }
        this.isMnemonic = false;
    }
}
