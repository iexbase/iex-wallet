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
import { Store } from "@ngrx/store";
// Redux
import * as WalletActions from "@redux/wallet/wallet.actions";
// Providers
import { WalletProvider } from "@providers/wallet/wallet";
var PreferencesComponent = /** @class */ (function () {
    /**
     * Create a new PreferencesComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {Store} store - Reactive service
     * @param {any} data - Additional parameters received
     */
    function PreferencesComponent(dialogRef, walletProvider, snackBar, store, data) {
        this.dialogRef = dialogRef;
        this.walletProvider = walletProvider;
        this.snackBar = snackBar;
        this.store = store;
        this.data = data;
        /**
         * List of all available colors
         *
         * @var any[]
         */
        this.colorsList = [
            { 'id': 0, 'name': 'Thunderbird', 'color': '#d11b12', 'class': 'theme-wallet-thunderbird' },
            { 'id': 1, 'name': 'Cornflower Blue', 'color': '#647ce8', 'class': 'theme-wallet-cornflower-blue' },
            { 'id': 2, 'name': 'Celery', 'color': '#99C361', 'class': 'theme-wallet-celery' },
            { 'id': 3, 'name': 'Corn', 'color': '#ebbf09', 'class': 'theme-wallet-corn' },
            { 'id': 4, 'name': 'Blue Violet', 'color': '#5D69BD', 'class': 'theme-wallet-blue-violet' },
            { 'id': 5, 'name': 'Terracotta', 'color': '#E58268', 'class': 'theme-wallet-terracotta' },
            { 'id': 6, 'name': 'Silver Chalice', 'color': '#AEAEAE', 'class': 'theme-wallet-silver-chalice' },
            { 'id': 7, 'name': 'Cerise', 'color': '#DC2C7E', 'class': 'theme-wallet-cerise' },
            { 'id': 8, 'name': 'Emerald', 'color': '#58CD87', 'class': 'theme-wallet-emerald' },
            { 'id': 9, 'name': 'Fuchsia Blue', 'color': '#973CC1', 'class': 'theme-wallet-fuchsia-blue' },
            { 'id': 10, 'name': 'Tulip Tree', 'color': '#EEAF4A', 'class': 'theme-wallet-tulip-tree' },
            { 'id': 11, 'name': 'Maroon Flush', 'color': '#CE235B', 'class': 'theme-wallet-maroon-flush' },
            { 'id': 12, 'name': 'Waikawa Gray', 'color': '#5B789E', 'class': 'theme-wallet-waikawa-gray' },
            { 'id': 13, 'name': 'Turquoise', 'color': '#26CFD2', 'class': 'theme-wallet-turquoise' },
            { 'id': 14, 'name': 'Tan Hide', 'color': '#FC8B59', 'class': 'theme-wallet-tan-hide' },
            { 'id': 15, 'name': 'Dull Lavender', 'color': '#99A4EA', 'class': 'theme-wallet-dull-lavender' }
        ];
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    PreferencesComponent.prototype.ngOnInit = function () {
        // Account Information
        var getWallet = this.walletProvider.getWallet(this.data.address);
        this.walletName = getWallet.name;
        // Select the previously recorded color
        this.colorIndex = this.colorsList.find(function (filter) { return filter.class === getWallet.color; }) || {};
    };
    /**
     * Update account settings
     *
     * @return void
     */
    PreferencesComponent.prototype.updateSettings = function () {
        var _this = this;
        this.walletName = this.defaultWalletName();
        this.walletProvider.updateWallet(this.data.address, {
            name: this.walletName,
            color: this.colorIndex.class
        }).then(function (result) {
            // Parameters for update
            var update = {
                id: result.id,
                changes: {
                    name: result.name,
                    color: result.color
                }
            };
            _this.store.dispatch(new WalletActions.UpdateWallet({ wallet: update }));
            _this.snackBar.open('Data successfully updated', null, {
                duration: 2000,
                panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
        });
    };
    /**
     * Button activity status
     *
     * @return boolean
     */
    PreferencesComponent.prototype.disabledButton = function () {
        return (!this.walletName && this.walletName.length == 0);
    };
    /**
     * Close modal
     *
     * @return void
     */
    PreferencesComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    /**
     * Set default name
     *
     * @return string
     */
    PreferencesComponent.prototype.defaultWalletName = function () {
        return (this.walletName && this.walletName.length > 1 ? this.walletName : 'Default wallet');
    };
    PreferencesComponent = __decorate([
        Component({
            selector: 'preferences',
            templateUrl: './preferences.component.html',
            styleUrls: ['./preferences.component.scss'],
        }),
        __param(4, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            WalletProvider,
            MatSnackBar,
            Store, Object])
    ], PreferencesComponent);
    return PreferencesComponent;
}());
export { PreferencesComponent };
//# sourceMappingURL=preferences.component.js.map