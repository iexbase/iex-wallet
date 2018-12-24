var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
// Providers
import { WalletProvider } from "@providers/wallet/wallet";
var VerifyMessageComponent = /** @class */ (function () {
    /**
     * Create a new PreferencesComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {any} data - Additional parameters received
     */
    function VerifyMessageComponent(dialogRef, snackBar, walletProvider, data) {
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.walletProvider = walletProvider;
        this.data = data;
        /**
         * Tron address
         *
         * @var string
         */
        this.accountAddress = null;
        /**
         * Confirmation Status
         *
         * @var boolean
         */
        this.verifiedSignature = false;
        /**
         * Status active button
         *
         * @var boolean
         */
        this.isButton = false;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    VerifyMessageComponent.prototype.ngOnInit = function () {
        this.accountAddress = this.data.address;
    };
    /**
     * After clicking, check the entered data
     *
     * @return void
     */
    VerifyMessageComponent.prototype.checkVerify = function () {
        var _this = this;
        this.isButton = true;
        try {
            this.walletProvider.verifySignature({
                message: this.verifyMessage,
                signature: this.verifySignature,
                address: this.accountAddress
            }).then(function (result) {
                _this.verifiedSignature = result;
            }).catch(function (err) {
                _this.verifiedSignature = false;
                _this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
            });
        }
        catch (e) {
            this.verifiedSignature = false;
        }
    };
    /**
     * Button activation status
     *
     * @return boolean
     */
    VerifyMessageComponent.prototype.isDisabled = function () {
        return ((!this.verifySignature || !this.verifyMessage || !this.accountAddress));
    };
    VerifyMessageComponent = __decorate([
        Component({
            selector: 'verify-message',
            templateUrl: './verify-message.component.html',
            styleUrls: ['./verify-message.component.scss'],
        }),
        __param(3, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            MatSnackBar,
            WalletProvider, Object])
    ], VerifyMessageComponent);
    return VerifyMessageComponent;
}());
export { VerifyMessageComponent };
//# sourceMappingURL=verify-message.component.js.map