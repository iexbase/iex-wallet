var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as WalletActions from '@redux/wallet/wallet.actions';
// Providers
import { BackupProvider } from "@providers/backup/backup";
import { Logger } from '@providers/logger/logger';
import { WalletProvider } from '@providers/wallet/wallet';
var CreateWalletComponent = /** @class */ (function () {
    /**
     * Object creation CreateWalletComponent
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive provider
     * @param {Logger} logger - Logger provider
     * @param {BackupProvider} backupProvider - BackupProvider
     */
    function CreateWalletComponent(walletProvider, store, logger, backupProvider) {
        this.walletProvider = walletProvider;
        this.store = store;
        this.logger = logger;
        this.backupProvider = backupProvider;
        /**
         *  Successful status
         *
         *  @var boolean
         */
        this.isSuccess = false;
        console.log(this.walletProvider.password);
    }
    CreateWalletComponent_1 = CreateWalletComponent;
    /**
     * Create a new account
     *
     * @return void
     */
    CreateWalletComponent.prototype.doCreateWallet = function () {
        var _this = this;
        this.walletProvider.createWallet().then(function (account) {
            // If we received a private key,
            // then the account is generated successfully.
            if ('privateKey' in account) {
                _this.accountName = CreateWalletComponent_1.defaultWalletName(_this.accountName);
                _this.walletProvider.addWallet({
                    name: _this.accountName,
                    privateKey: account.privateKey,
                    address: account.address.base58
                }).then(function (finish) {
                    _this.store.dispatch(new WalletActions.AddWallet({ wallet: finish }));
                    _this.accountData = account;
                    _this.isSuccess = true;
                });
            }
        }).catch(function (err) {
            _this.logger.error('Create: could not create wallet', err);
        });
    };
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
    CreateWalletComponent.prototype.onDownload = function (options) {
        this.backupProvider.walletDownload(this.walletProvider.password, {}, options.address.base58).finally();
    };
    /**
     * Set default name
     *
     * @return string
     */
    CreateWalletComponent.defaultWalletName = function (name) {
        return (name && name.length > 1 ? name : 'Default wallet');
    };
    var CreateWalletComponent_1;
    CreateWalletComponent = CreateWalletComponent_1 = __decorate([
        Component({
            selector: 'create-wallet',
            templateUrl: './create-wallet.component.html',
            styleUrls: ['./create-wallet.component.scss'],
        }),
        __metadata("design:paramtypes", [WalletProvider,
            Store,
            Logger,
            BackupProvider])
    ], CreateWalletComponent);
    return CreateWalletComponent;
}());
export { CreateWalletComponent };
//# sourceMappingURL=create-wallet.component.js.map