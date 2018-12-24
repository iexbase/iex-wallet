var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener } from "@angular/core";
import { LocalStorage } from "ngx-webstorage";
import { MatDialog, MatSnackBar } from "@angular/material";
import { select, Store } from "@ngrx/store";
import * as _ from 'lodash';
// Redux
import * as fromWallet from "@redux/wallet/wallet.reducer";
// Env
import env from "../../../../../environments";
// Modals
import { ExportWalletComponent } from "@modules/wallet/components/export-wallet/export-wallet.component";
import { SignedMessageComponent } from "@modules/wallet/components/signed-message/signed-message.component";
import { DeleteWalletComponent } from "@modules/wallet/components/delete-wallet/delete-wallet.component";
import { FreezeBalanceComponent } from "@modules/wallet/components/freeze-balance/freeze-balance.component";
import { ReceiveAccountComponent } from "@modules/wallet/components/receive-account/receive-account.component";
import { TransferAssetComponent } from "@modules/wallet/components/transfer-asset/transfer-asset.component";
import { PreferencesComponent } from "@modules/wallet/components/preferences/preferences.component";
// Providers
import { WalletProvider } from "@providers/wallet/wallet";
import { ConfigProvider } from "@providers/config/config";
import { ElectronProvider } from "@providers/electron/electron";
var WalletPage = /** @class */ (function () {
    /**
     * Create a new PreferencesComponent object
     *
     * @param {Store} store - Reactive service
     * @param {MatDialog} dialog - Service can be used to open modal dialogs
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {ConfigProvider} config - Config provider
     * @param {ElectronProvider} electronProvider - Electron provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     */
    function WalletPage(store, dialog, walletProvider, config, electronProvider, snackBar) {
        this.store = store;
        this.dialog = dialog;
        this.walletProvider = walletProvider;
        this.config = config;
        this.electronProvider = electronProvider;
        this.snackBar = snackBar;
        /**
         * Hide part of the header
         *
         * @var boolean
         */
        this.miniHeader = false;
        /**
         * Wallet detail
         *
         * @var any
         */
        this.wallet = {
            color: null
        };
        /**
         * List transactions
         *
         * @var any[]
         */
        this.transactions = [];
        /**
         * Status loading
         *
         * @var boolean
         */
        this.isLoading = false;
        /**
         * Status hover update
         *
         * @var boolean
         */
        this.enabledOn = false;
        /**
         * Wallet opening
         *
         * @var boolean
         */
        this.primaryWalletOpening = false;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    WalletPage.prototype.ngOnInit = function () {
        var _this = this;
        // List all accounts
        this.wallets = this.store.pipe(select(fromWallet.selectAllWallets));
        // Check the presence of the recorded wallet
        // and activates the cached wallet
        this.activeAccount != undefined && this.wallets.subscribe(function (data) {
            // From the array, select the required
            var selected = data.filter(function (selected) { return selected.address == _this.activeAccount; });
            // If the array is not empty
            if (selected[0] && !_.isEmpty(selected)) {
                (_this.primaryWalletOpening == false ?
                    _this.openWalletDetails(selected[0], true) :
                    _this.wallet = selected[0]);
            }
        });
    };
    /**
     * On scrolling
     *
     * @return void
     */
    WalletPage.prototype.onScroll = function ($event) {
        this.miniHeader = $event.srcElement.scrollTop > 200;
    };
    ;
    /**
     * Account change
     *
     * @param {any} item - wallet id
     * @param {boolean} hidden - multi update
     * @return void
     */
    WalletPage.prototype.openWalletDetails = function (item, hidden) {
        var _this = this;
        if (hidden === void 0) { hidden = false; }
        this.wallet = item;
        // Exclude the possibility of updating the same wallet
        if (this.wallet.address == this.activeAccount && hidden == false)
            return false;
        this.activeAccount = this.wallet.address;
        this.primaryWalletOpening = true;
        this.walletProvider.fullUpdateAccount(item.address)
            .finally();
        this.transactions = [];
        this.currentPage = 0;
        this.totalTransaction = 0;
        this.isLoading = true;
        this.activeAccount = this.wallet.address;
        this.scrollDisabled = false;
        this.getTransactions(this.currentPage, function (items) {
            _this.transactions = _this.transactions.concat(items.res);
            _this.isLoading = false;
        });
    };
    /**
     *  Update wallet id
     *
     *  @return void
     */
    WalletPage.prototype.updateWallet = function () {
        this.walletProvider.fullUpdateAccount(this.wallet.address)
            .finally();
        this.snackBar.open('Account updated successfully', null, {
            duration: 2000
        });
    };
    /**
     * We load new transactions when scrolling
     *
     * @return void
     */
    WalletPage.prototype.onScrollDown = function () {
        var _this = this;
        this.getTransactions(this.currentPage, function (items) {
            _this.transactions = _this.transactions.concat(items.res);
        });
    };
    /**
     * Get wallet transactions by address
     *
     * @param {number} page - page
     * @param {any} saveResultsCallback - callback result
     * @return void
     */
    WalletPage.prototype.getTransactions = function (page, saveResultsCallback) {
        var _this = this;
        if (page === void 0) { page = 0; }
        this.walletProvider.getTxsFromServer({
            address: this.wallet.address,
            limit: 20,
            start: page,
            total: this.totalTransaction
        }).then(function (data) {
            _this.currentPage += 20;
            _this.totalTransaction = data['total'];
            saveResultsCallback(data);
        });
    };
    /**
     * Open settings window
     *
     * @return void
     */
    WalletPage.prototype.preferenceWallet = function () {
        var dialogRef = this.dialog.open(PreferencesComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(function () { });
    };
    /**
     * Open transfer window
     *
     * @return void
     */
    WalletPage.prototype.transferModal = function () {
        var dialogRef = this.dialog.open(TransferAssetComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(function () { });
    };
    /**
     * Open receive address window
     *
     * @return void
     */
    WalletPage.prototype.receiveModal = function () {
        var dialogRef = this.dialog.open(ReceiveAccountComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(function () { });
    };
    /**
     * Open freeze balance window
     *
     * @return void
     */
    WalletPage.prototype.freezeModal = function () {
        var dialogRef = this.dialog.open(FreezeBalanceComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(function () { });
    };
    /**
     * Open delete wallet window
     *
     * @return void
     */
    WalletPage.prototype.deleteWalletModal = function () {
        var dialogRef = this.dialog.open(DeleteWalletComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(function () { });
    };
    /**
     * Open signed message window
     *
     * @return void
     */
    WalletPage.prototype.signedMessageModal = function () {
        var dialogRef = this.dialog.open(SignedMessageComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(function () { });
    };
    /**
     * Open backup wallet window
     *
     * @return void
     */
    WalletPage.prototype.exportWalletModal = function () {
        var dialogRef = this.dialog.open(ExportWalletComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(function () { });
    };
    /**
     * Open link in browser
     *
     * @return boolean
     */
    WalletPage.prototype.openExternalLink = function (url, type) {
        return this.electronProvider.openExternalLink((env.explorer.url + "/" + type + "/" + url));
    };
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], WalletPage.prototype, "activeAccount", void 0);
    __decorate([
        HostListener('scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], WalletPage.prototype, "onScroll", null);
    WalletPage = __decorate([
        Component({
            selector: 'wallet-page',
            templateUrl: './wallet.page.html',
            styleUrls: ['./wallet.page.scss'],
        }),
        __metadata("design:paramtypes", [Store,
            MatDialog,
            WalletProvider,
            ConfigProvider,
            ElectronProvider,
            MatSnackBar])
    ], WalletPage);
    return WalletPage;
}());
export { WalletPage };
//# sourceMappingURL=wallet.page.js.map