var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from "@angular/core";
import { WalletProvider } from "@providers/wallet/wallet";
var LoginPage = /** @class */ (function () {
    /**
     * Create a new LoginPage object
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     */
    function LoginPage(walletProvider) {
        this.walletProvider = walletProvider;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage = __decorate([
        Component({
            selector: 'login-page',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [WalletProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map