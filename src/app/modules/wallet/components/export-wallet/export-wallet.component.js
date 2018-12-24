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
// Providers
import { BackupProvider } from "@providers/backup/backup";
import { ElectronProvider } from "@providers/electron/electron";
import { Logger } from "@providers/logger/logger";
import { WalletProvider } from "@providers/wallet/wallet";
var ExportWalletComponent = /** @class */ (function () {
    /**
     * Object creation ExportWalletComponent
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive provider
     * @param {MatSnackBar} snackBar - Snack bar service
     * @param {ElectronProvider} electron - Electron provider
     * @param {Logger} logger - Log provider
     * @param {BackupProvider} backup - Backup provider
     * @param {any} data - Additional parameters received
     */
    function ExportWalletComponent(dialogRef, walletProvider, store, snackBar, electron, logger, backup, data) {
        this.dialogRef = dialogRef;
        this.walletProvider = walletProvider;
        this.store = store;
        this.snackBar = snackBar;
        this.electron = electron;
        this.logger = logger;
        this.backup = backup;
        this.data = data;
        this.isNotIncludePrivateKey = false;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    ExportWalletComponent.prototype.ngOnInit = function () {
        this.logger.info('Loaded: ExportWalletComponent');
        this.wallet = this.walletProvider.getWallet(this.data.address);
    };
    /**
     * Download wallet backup in JSON format
     *
     * @return void
     */
    ExportWalletComponent.prototype.downloadJSON = function () {
        this.backup.walletDownload(this.walletProvider.password, {
            privateKey: (!this.isNotIncludePrivateKey)
        }, this.data.address).then(function () { });
    };
    /**
     * Clipboard backup wallet data
     *
     * @return void
     */
    ExportWalletComponent.prototype.goToClipboard = function () {
        var _this = this;
        this.backup.walletBackup(this.walletProvider.password, {
            privateKey: (!this.isNotIncludePrivateKey)
        }, this.data.address).then(function (result) {
            _this.electron.writeToClipboard(JSON.stringify(result));
            _this.snackBar.open('Data copied', null, {
                duration: 2000
            });
        });
    };
    /**
     * Close modal
     *
     * @return void
     */
    ExportWalletComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    ExportWalletComponent = __decorate([
        Component({
            selector: 'export-wallet',
            templateUrl: './export-wallet.component.html',
            styleUrls: ['./export-wallet.component.scss'],
        }),
        __param(7, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            WalletProvider,
            Store,
            MatSnackBar,
            ElectronProvider,
            Logger,
            BackupProvider, Object])
    ], ExportWalletComponent);
    return ExportWalletComponent;
}());
export { ExportWalletComponent };
//# sourceMappingURL=export-wallet.component.js.map