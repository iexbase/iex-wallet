var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import * as _ from 'lodash';
// Providers
import { AppProvider } from "@providers/app/app";
import { Logger } from "@providers/logger/logger";
import { WalletProvider } from "@providers/wallet/wallet";
import { DownloadProvider } from "@providers/download/download";
var BackupProvider = /** @class */ (function () {
    /**
     * Object creation BackupProvider
     *
     * @param appProvider - App Provider
     * @param downloadProvider - Download Provider
     * @param logger - Logger
     * @param walletProvider - Wallet Provider
     */
    function BackupProvider(appProvider, downloadProvider, logger, walletProvider) {
        this.appProvider = appProvider;
        this.downloadProvider = downloadProvider;
        this.logger = logger;
        this.walletProvider = walletProvider;
        this.logger.debug('BackupProvider initialized');
    }
    /**
     * We collect wallet backup data in JSON
     *
     * @param password - Current password
     * @param opts - Advanced Options
     * @param walletId - Wallet Address
     *
     * @return Promise
     */
    BackupProvider.prototype.walletBackup = function (password, opts, walletId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var ew = _this.walletExport(password, opts, walletId);
            if (!ew)
                return reject('Could not create backup');
            resolve(JSON.stringify(ew));
        });
    };
    /**
     * Request to download backup wallet data
     *
     * @param password - Current password
     * @param opts - Advanced Options
     * @param walletId - Wallet Address
     *
     * @return Promise
     */
    BackupProvider.prototype.walletDownload = function (password, opts, walletId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var wallet = _this.walletProvider.getWallet(walletId);
            var ew = _this.walletExport(password, opts, walletId);
            if (!ew)
                return reject('Could not create backup');
            var walletName = wallet.name || wallet.id;
            var filename = walletName + '-' + _this.appProvider.info.nameCase + '-backup.aes.json';
            _this.downloadProvider.download(JSON.stringify(ew), filename).then(function () {
                return resolve();
            });
        });
    };
    /**
     * Setting up backup before exporting
     *
     * @param password - Current password
     * @param opts - Advanced options
     * @param walletId - Wallet Address
     *
     * @return any
     */
    BackupProvider.prototype.walletExport = function (password, opts, walletId) {
        if (!password)
            return null;
        // Obtaining detailed information of the wallet before export
        var wallet = this.walletProvider.getWalletAndPrivateKey(walletId);
        wallet.provider = this.appProvider.info.nameCase;
        // Configuring to add a private key to the export file
        if (!_.isEmpty(opts) && 'privateKey' in opts && opts['privateKey'] == false)
            delete wallet['privateKey'];
        try {
            if (!_.isEmpty(wallet) && wallet.address == walletId)
                return wallet;
        }
        catch (err) {
            this.logger.error('Error exporting wallet: ', err);
        }
    };
    BackupProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppProvider,
            DownloadProvider,
            Logger,
            WalletProvider])
    ], BackupProvider);
    return BackupProvider;
}());
export { BackupProvider };
//# sourceMappingURL=backup.js.map