/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Injectable} from "@angular/core";
import * as _ from 'lodash';

// Providers
import { AppProvider } from "@providers/app/app";
import { Logger } from "@providers/logger/logger";
import { WalletProvider } from "@providers/wallet/wallet";
import { DownloadProvider } from "@providers/download/download";

@Injectable()
export class BackupProvider
{
    /**
     * Object creation BackupProvider
     *
     * @param {AppProvider} appProvider - App Provider
     * @param {DownloadProvider} downloadProvider - Download Provider
     * @param {Logger} logger - Log provider
     * @param {WalletProvider} walletProvider - Wallet Provider
     */
    constructor(
        private appProvider: AppProvider,
        private downloadProvider: DownloadProvider,
        private logger: Logger,
        private walletProvider: WalletProvider
    ) {
        this.logger.debug('BackupProvider initialized');
    }

    /**
     * We collect wallet backup data in JSON
     *
     * @param {Buffer | string} password - Current password
     * @param {any} opts - Advanced Options
     * @param {string} walletId - Wallet Address
     *
     * @return Promise
     */
    public walletBackup(password, opts, walletId: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let ew = this.walletExport(password, opts, walletId);
            if (!ew) return reject('Could not create backup');

            resolve(JSON.stringify(ew));
        });
    }

    /**
     * Request to download backup wallet data
     *
     * @param {Buffer | string} password - Current password
     * @param {any} opts - Advanced Options
     * @param {string} walletId - Wallet Address
     *
     * @return Promise
     */
    public walletDownload(password, opts, walletId: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let wallet = this.walletProvider.getWallet(walletId);
            let ew = this.walletExport(password, opts, walletId);
            if (!ew) return reject('Could not create backup');

            let walletName = wallet.name || wallet.id;

            let filename = walletName + '-'+ this.appProvider.info.nameCase + '-backup.aes.json';
            this.downloadProvider.download(JSON.stringify(ew), filename).then(() => {
                return resolve();
            });
        });
    }

    /**
     * Setting up backup before exporting
     *
     * @param {Buffer | any} password - Current password
     * @param {any} opts - Advanced options
     * @param {string} walletId - Wallet Address
     *
     * @return any
     */
    public walletExport(password: string, opts, walletId: string): any
    {
        if(!password) return null;

        // Obtaining detailed information of the wallet before export
        let wallet = this.walletProvider.getWalletAndPrivateKey(walletId);
        wallet.provider = this.appProvider.info.nameCase;
        // Configuring to add a private key to the export file
        if(!_.isEmpty(opts) && 'privateKey' in opts && opts['privateKey'] == false)
            delete wallet['privateKey'];

        try {
            if(!_.isEmpty(wallet) && wallet.address == walletId)
                return wallet;
        }catch (err) {
            this.logger.error('Error exporting wallet: ', err);
        }
    }
}
