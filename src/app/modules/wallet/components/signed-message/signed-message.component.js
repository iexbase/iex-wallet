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
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
// Providers
import { WalletProvider } from "@providers/wallet/wallet";
var SignedMessageComponent = /** @class */ (function () {
    /**
     * Create a new SignedMessageComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {any} data - Additional parameters received
     */
    function SignedMessageComponent(dialogRef, walletProvider, data) {
        this.dialogRef = dialogRef;
        this.walletProvider = walletProvider;
        this.data = data;
        /**
         * Address signed
         *
         * @var string
         */
        this.accountAddress = null;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    SignedMessageComponent.prototype.ngOnInit = function () {
        this.accountAddress = this.data.address;
    };
    /**
     * Sign the message in the printing process
     *
     * @return void
     */
    SignedMessageComponent.prototype.encryptedMessage = function () {
        this.handler();
    };
    /**
     * Handler signature
     *
     * @return void
     */
    SignedMessageComponent.prototype.handler = function () {
        var _this = this;
        if (this.messageSigned && this.messageSigned.startsWith(' ', 1) == false && this.messageSigned.length > 1) {
            this.walletProvider.signTx(this.messageSigned).then(function (result) {
                _this.encryptedData = result;
            });
            return;
        }
        this.encryptedData = '';
    };
    /**
     * Close modal
     *
     * @return void
     */
    SignedMessageComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    SignedMessageComponent = __decorate([
        Component({
            selector: 'signed-message',
            templateUrl: './signed-message.component.html',
            styleUrls: ['./signed-message.component.scss'],
        }),
        __param(2, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            WalletProvider, Object])
    ], SignedMessageComponent);
    return SignedMessageComponent;
}());
export { SignedMessageComponent };
//# sourceMappingURL=signed-message.component.js.map