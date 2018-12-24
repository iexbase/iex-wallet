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
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as WalletActions from "@redux/wallet/wallet.actions";
// Providers
import { WalletProvider } from "@providers/wallet/wallet";
var ImportMnemonicComponent = /** @class */ (function () {
    /**
     * Object creation ImportMnemonicComponent
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Router} router - Router service
     * @param {Store} store - Reactive service
     */
    function ImportMnemonicComponent(walletProvider, router, store) {
        this.walletProvider = walletProvider;
        this.router = router;
        this.store = store;
        /**
         * Availability status
         *
         * @var boolean
         */
        this.isMnemonic = true;
        /**
         * Show advanced options
         *
         * @var boolean
         */
        this.hideOptional = true;
        /**
         * Go to account selection by "mnemonic"
         *
         * @var boolean
         */
        this.nextToSelectWallet = false;
        /**
         * Test button click
         *
         * @var boolean
         */
        this.isDisabledButton = false;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    ImportMnemonicComponent.prototype.ngOnInit = function () {
        // empty
    };
    /**
     * On the fly, check the entered data
     *
     * @return void | boolean
     */
    ImportMnemonicComponent.prototype.onChangeMnemonic = function () {
        if (this.disableButton()) {
            return this.hideOptional = true;
        }
        // Show advanced options
        this.hideOptional = false;
        // empty wallet name
        this.walletName = undefined;
    };
    /**
     * Import wallet and get available addresses on "Mnemonic"
     *
     * @return void
     */
    ImportMnemonicComponent.prototype.goToImport = function () {
        this.nextToSelectWallet = true;
        for (var i = 0; i < 10; i++) {
            var address = this.walletProvider.addByMnemonic(this.mnemonic, i);
            this.addresses.push(address);
        }
    };
    /**
     *  Finish import
     *
     *  @param {any} walletId - Wallet details
     */
    ImportMnemonicComponent.prototype.finishImport = function (walletId) {
        var _this = this;
        this.isDisabledButton = true;
        this.walletName = this.defaultWalletName();
        this.walletProvider.addWallet({
            name: this.walletName,
            privateKey: walletId.privateKey,
            address: walletId.address.base58
        }).then(function (added) {
            // Add to dispatcher
            _this.store.dispatch(new WalletActions.AddWallet({ wallet: added }));
            // Redirect to Wallet
            _this.router.navigate(['/', 'wallet']);
        });
    };
    /**
     * Come back
     *
     * @return void
     */
    ImportMnemonicComponent.prototype.onBack = function () {
        this.addresses = [];
        this.nextToSelectWallet = false;
    };
    /**
     * Button availability status
     *
     * @return boolean
     */
    ImportMnemonicComponent.prototype.disableButton = function () {
        this.validateMnemonic();
        return (!this.mnemonic ||
            !this.isMnemonic ||
            this.mnemonic.split(' ').length < 12 ||
            this.mnemonic.split(' ').length > 12);
    };
    /**
     * Set default name
     *
     * @return string
     */
    ImportMnemonicComponent.prototype.defaultWalletName = function () {
        return (this.walletName && this.walletName.length > 1
            ? this.walletName : 'Default wallet');
    };
    /**
     * Validation of entered values
     *
     * @return boolean | void
     */
    ImportMnemonicComponent.prototype.validateMnemonic = function () {
        if (/^(\w+\s?)*\s*$/.test(this.mnemonic)) {
            return this.isMnemonic = true;
        }
        this.isMnemonic = false;
    };
    ImportMnemonicComponent = __decorate([
        Component({
            selector: 'import-mnemonic',
            templateUrl: './import-mnemonic.component.html',
            styleUrls: ['./import-mnemonic.component.scss'],
        }),
        __metadata("design:paramtypes", [WalletProvider,
            Router,
            Store])
    ], ImportMnemonicComponent);
    return ImportMnemonicComponent;
}());
export { ImportMnemonicComponent };
//# sourceMappingURL=import-mnemonic.component.js.map