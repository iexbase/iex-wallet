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
// env config
import env from "../../../../../environments";
// Providers
import { ConfigProvider } from "@providers/config/config";
import { ElectronProvider } from "@providers/electron/electron";
var ReceiveAccountComponent = /** @class */ (function () {
    /**
     * Object creation ReceiveAccountComponent
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {ElectronProvider} electron - Electron Provider
     * @param {ConfigProvider} config - Config Provider
     * @param {any} data - Additional parameters received
     */
    function ReceiveAccountComponent(dialogRef, snackBar, electron, config, data) {
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.electron = electron;
        this.config = config;
        this.data = data;
        /**
         * Receive request
         *
         * @var boolean
         */
        this.isGenerateRequest = false;
        /**
         * List currencies
         *
         * @var any
         */
        this.currencies = [
            { key: 'USD', value: 'USD' },
            { key: 'EUR', value: 'EUR' },
            { key: 'TRX', value: 'TRX' }
        ];
        /**
         * Available fields
         *
         * @var any
         */
        this.fields = {
            amount: undefined,
            data: "",
            token: 'USD',
            address: null
        };
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    ReceiveAccountComponent.prototype.ngOnInit = function () {
        this.wallet = this.data;
        this.fields.address = this.wallet.address;
    };
    /**
     * Change type currency
     *
     * @return void
     */
    ReceiveAccountComponent.prototype.onCurrencyChange = function (value) {
        this.fields.token = value;
    };
    /**
     * Copy TRON Address
     *
     * @return void
     */
    ReceiveAccountComponent.prototype.copyAddress = function () {
        this.electron.writeToClipboard(this.wallet.address);
        this.snackBar.open('Address copied to clipboard', null, {
            duration: 2000,
            panelClass: ['snackbar-theme-dialog', 'custom-width'],
        });
    };
    /**
     * Open address in "TronScan"
     *
     * @return void
     */
    ReceiveAccountComponent.prototype.addressInExplorer = function () {
        this.electron.openExternalLink(env.explorer.url + 'address/' + this.wallet.address);
    };
    /**
     * Request for replenishment
     *
     * @return void
     */
    ReceiveAccountComponent.prototype.generateRequest = function () {
        this.isGenerateRequest = true;
    };
    /**
     * Come back
     *
     * @return void
     */
    ReceiveAccountComponent.prototype.back = function () {
        this.isGenerateRequest = false;
    };
    /**
     * Close modal
     *
     * @return void
     */
    ReceiveAccountComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    ReceiveAccountComponent = __decorate([
        Component({
            selector: 'receive-account',
            templateUrl: './receive-account.component.html',
            styleUrls: ['./receive-account.component.scss'],
        }),
        __param(4, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            MatSnackBar,
            ElectronProvider,
            ConfigProvider, Object])
    ], ReceiveAccountComponent);
    return ReceiveAccountComponent;
}());
export { ReceiveAccountComponent };
//# sourceMappingURL=receive-account.component.js.map