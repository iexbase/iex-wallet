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
import { MatSnackBar } from "@angular/material";
import { Store } from "@ngrx/store";
// Redux
import * as WalletActions from "@redux/wallet/wallet.actions";
// Providers
import { Logger } from "@providers/logger/logger";
import { WalletProvider } from "@providers/wallet/wallet";
var ImportWalletComponent = /** @class */ (function () {
    /**
     * Object creation ImportWalletComponent
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive service
     * @param {Logger} logger - Log provider
     * @param {MatSnackBar} snackBar - is a service for displaying snack-bar notifications.
     */
    function ImportWalletComponent(walletProvider, store, logger, snackBar) {
        this.walletProvider = walletProvider;
        this.store = store;
        this.logger = logger;
        this.snackBar = snackBar;
        /**
         * Show advanced options
         *
         * @var boolean
         */
        this.hideOptional = true;
        /**
         * Test button click
         *
         * @var boolean
         */
        this.disablePrivateKey = true;
        /**
         * Account name (Optional)
         *
         * @var string
         */
        this.walletName = null;
        /**
         *  In case of successful import
         *
         *  @var boolean
         */
        this.isSuccess = false;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    ImportWalletComponent.prototype.ngOnInit = function () {
        this.lottieConfig = {
            path: 'assets/animations/smile/success.json',
            renderer: 'canvas',
            autoplay: true,
            loop: false
        };
    };
    /**
     * On the fly, check the entered data
     *
     * @return void | boolean
     */
    ImportWalletComponent.prototype.onChangeImportKey = function () {
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
    };
    /**
     * Import account from private key
     *
     * @return void
     */
    ImportWalletComponent.prototype.doImportWallet = function () {
        var _this = this;
        this.walletName = this.defaultWalletName();
        this.walletProvider.importWallet(this.privateKey).then(function (result) {
            // Add a new account to the storage of all accounts
            _this.walletProvider.getBalance(result.address.base58).then(function (account) {
                _this.walletProvider.addWallet({
                    name: _this.walletName,
                    privateKey: result.privateKey,
                    address: result.address.base58,
                    publicKey: result.publicKey,
                    balance: account
                }).then(function (finish) {
                    // Add to dispatcher
                    _this.store.dispatch(new WalletActions.AddWallet({ wallet: finish }));
                    _this.isSuccess = true;
                }).catch(function (err) {
                    _this.isSuccess = false;
                    _this.snackBar.open(err, null, {
                        duration: 3000,
                        panelClass: ['snackbar-theme-dialog']
                    });
                });
            });
        }).catch(function (err) {
            _this.snackBar.open(err, null, {
                duration: 3000,
                panelClass: ['snackbar-theme-dialog']
            });
            _this.logger.error('Import: could not wallet', err);
        });
    };
    /**
     * Set default name
     *
     * @return string
     */
    ImportWalletComponent.prototype.defaultWalletName = function () {
        return (this.walletName && this.walletName.length > 1
            ? this.walletName : 'Default wallet');
    };
    ImportWalletComponent = __decorate([
        Component({
            selector: 'import-wallet',
            templateUrl: './import-wallet.component.html',
            styleUrls: ['./import-wallet.component.scss'],
        }),
        __metadata("design:paramtypes", [WalletProvider,
            Store,
            Logger,
            MatSnackBar])
    ], ImportWalletComponent);
    return ImportWalletComponent;
}());
export { ImportWalletComponent };
//# sourceMappingURL=import-wallet.component.js.map