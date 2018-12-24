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
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
var CreateAccountComponent = /** @class */ (function () {
    /**
     * Create a new LoginPage object
     *
     * @param {Store} store - Reactive service
     * @param {Router} router - Provides the navigation and url manipulation capabilities.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {FormBuilder} formBuilder - Creates an AbstractControl from a user-specified configuration.
     */
    function CreateAccountComponent(store, router, walletProvider, formBuilder) {
        this.store = store;
        this.router = router;
        this.walletProvider = walletProvider;
        this.formBuilder = formBuilder;
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    CreateAccountComponent.prototype.ngOnInit = function () {
        this.exportWalletForm = this.formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, { validator: this.matchingPasswords('password', 'confirmPassword') });
    };
    /**
     * Verification of passwords for coincidence
     *
     * @param {string} passwordKey - password
     * @param {string} confirmPasswordKey - Password confirmation
     * @return any
     */
    CreateAccountComponent.prototype.matchingPasswords = function (passwordKey, confirmPasswordKey) {
        return function (group) {
            var password = group.controls[passwordKey];
            var confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
            return undefined;
        };
    };
    /**
     * Create an account and go to home
     *
     * @return void
     */
    CreateAccountComponent.prototype.goToCheck = function () {
        var _this = this;
        this.walletProvider.createPassword(this.exportWalletForm.value.password)
            .then(function () {
            _this.router.navigate(['/', 'dashboard']);
        });
    };
    CreateAccountComponent = __decorate([
        Component({
            selector: 'create-account',
            templateUrl: './create-account.component.html',
            styleUrls: ['./create-account.component.scss']
        }),
        __metadata("design:paramtypes", [Store,
            Router,
            WalletProvider,
            FormBuilder])
    ], CreateAccountComponent);
    return CreateAccountComponent;
}());
export { CreateAccountComponent };
//# sourceMappingURL=create-account.component.js.map