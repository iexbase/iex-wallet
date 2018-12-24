/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "@redux/index";
import * as WalletActions from '@redux/wallet/wallet.actions';

// Providers
import { BackupProvider } from "@providers/backup/backup";
import { Logger } from '@providers/logger/logger';
import { WalletProvider } from '@providers/wallet/wallet';

@Component({
    selector: 'create-wallet',
    templateUrl: './create-wallet.component.html',
    styleUrls: ['./create-wallet.component.scss'],
})
export class CreateWalletComponent
{
    /**
     * Account name
     *
     * @var string
     */
    public accountName: string;

    /**
     *  Successful status
     *
     *  @var boolean
     */
    public isSuccess: boolean = false;

    /**
     * Created account data
     *
     * @var any
     */
    public accountData: any;

    /**
     * Object creation CreateWalletComponent
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive provider
     * @param {Logger} logger - Logger provider
     * @param {BackupProvider} backupProvider - BackupProvider
     */
    constructor(
        private walletProvider: WalletProvider,
        private store: Store<AppState>,
        private logger: Logger,
        private backupProvider: BackupProvider
    ) {
        console.log(this.walletProvider.password)
    }

    /**
     * Create a new account
     *
     * @return void
     */
    public doCreateWallet(): void
    {
        this.walletProvider.createWallet().then(account =>
        {
            // If we received a private key,
            // then the account is generated successfully.
            if('privateKey' in account)
            {
                this.accountName = CreateWalletComponent.defaultWalletName(this.accountName);
                this.walletProvider.addWallet({
                    name: this.accountName,
                    privateKey: account.privateKey,
                    address: account.address.base58
                }).then(finish =>
                {
                    this.store.dispatch(
                        new WalletActions.AddWallet(
                            { wallet: finish }
                        )
                    );
                    this.accountData = account;
                    this.isSuccess = true;
                });
            }
        }).catch(err => {
            this.logger.error('Create: could not create wallet', err);
        })
    }

    /**
     *  Save Your Backup File
     *
     *  Warning:
     *      Do not lose it! TRON Foundation cannot help you recover a lost key.
     *      Do not share it! Your funds may be stolen if you use this file a malicious site.
     *      Make a backup! Just in case your laptop is set on fire.
     *
     *  @param {any} options - Additions options
     *  @return void
     */
    onDownload(options:any): void {
        this.backupProvider.walletDownload(
            this.walletProvider.password, {}, options.address.base58
        ).then(() => {})
    }

    /**
     * Set default name
     *
     * @return string
     */
    private static defaultWalletName(name: string): string {
        return (name && name.length > 1 ? name : 'Default wallet')
    }
}
