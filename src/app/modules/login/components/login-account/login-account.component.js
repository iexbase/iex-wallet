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
import { WalletProvider } from "@providers/wallet/wallet";
import { Router } from "@angular/router";
import { AppProvider } from "@providers/app/app";
import { Store } from "@ngrx/store";
import * as WalletActions from "@redux/wallet/wallet.actions";
var LoginAccountComponent = /** @class */ (function () {
    /**
     * Create a new LoginPage object
     *
     * @param {Store} store - Reactive service
     * @param {Router} router - Provides the navigation and url manipulation capabilities.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {AppProvider} appProvider - Application provider
     */
    function LoginAccountComponent(store, router, walletProvider, appProvider) {
        this.store = store;
        this.router = router;
        this.walletProvider = walletProvider;
        this.appProvider = appProvider;
        /**
         * Password display status
         *
         * @var boolean
         */
        this.isVisibilityPassword = false;
        /**
         * Check the status of clicking on authorization buttons
         *
         * @var boolean
         */
        this.isSubmit = false;
    }
    /**
     * Password check in case of success go to the main account page
     *
     * @return void
     */
    LoginAccountComponent.prototype.goToLogin = function () {
        var _this = this;
        this.isSubmit = true;
        this.errorMessage = null;
        this.walletProvider.hasPassword(this.password)
            .then(function (password) {
            if (password.result == true) {
                _this.store.dispatch(new WalletActions.AddWallets({
                    wallets: _this.walletProvider.getWallets()
                }));
                _this.router.navigate(['/', 'dashboard']);
            }
        }).catch(function (err) {
            _this.errorMessage = err;
        });
    };
    LoginAccountComponent = __decorate([
        Component({
            selector: 'login-account',
            templateUrl: './login-account.component.html',
            styleUrls: ['./login-account.component.scss']
        }),
        __metadata("design:paramtypes", [Store,
            Router,
            WalletProvider,
            AppProvider])
    ], LoginAccountComponent);
    return LoginAccountComponent;
}());
export { LoginAccountComponent };
//# sourceMappingURL=login-account.component.js.map