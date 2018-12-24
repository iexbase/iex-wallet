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
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
// LocalStorage
import { LocalStorage } from "ngx-webstorage";
// Redux
import * as WalletActions from "@redux/wallet//wallet.actions";
// Providers
import { WalletProvider } from "@providers/wallet/wallet";
var DeleteWalletComponent = /** @class */ (function () {
    /**
     * Object creation DeleteWalletComponent
     *
     * @param {MatDialogRef} dialogRef - Dialog service
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive provider
     * @param {Router} router - Router service
     * @param {any} data - Additional parameters received
     */
    function DeleteWalletComponent(dialogRef, walletProvider, store, router, data) {
        this.dialogRef = dialogRef;
        this.walletProvider = walletProvider;
        this.store = store;
        this.router = router;
        this.data = data;
        //
    }
    /**
     *  Deleting an account
     *
     *  @return void
     */
    DeleteWalletComponent.prototype.deleteWallet = function () {
        // Get information about a deleted account
        var wallet = this.walletProvider.getWallet(this.data.address);
        this.walletProvider.deleteWallet(this.data.address);
        this.store.dispatch(new WalletActions.DeleteWallet({
            id: wallet.id
        }));
        this.activeAccount = '';
        // Redirect to wallet page
        this.router.navigate(['/wallet']);
        this.onClose();
    };
    /**
     * Close modal
     *
     * @return void
     */
    DeleteWalletComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], DeleteWalletComponent.prototype, "activeAccount", void 0);
    DeleteWalletComponent = __decorate([
        Component({
            selector: 'delete-wallet',
            templateUrl: './delete-wallet.component.html',
            styleUrls: ['./delete-wallet.component.scss'],
        }),
        __param(4, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            WalletProvider,
            Store,
            Router, Object])
    ], DeleteWalletComponent);
    return DeleteWalletComponent;
}());
export { DeleteWalletComponent };
//# sourceMappingURL=delete-wallet.component.js.map