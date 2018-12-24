var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { takeWhile } from "rxjs/operators";
// env
import env from "../../../../../environments";
// Providers
import { ElectronProvider } from "@providers/electron/electron";
import { WalletProvider } from "@providers/wallet/wallet";
var TransactionInfoComponent = /** @class */ (function () {
    /**
     * Create a new TransactionInfoComponent object
     *
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {ElectronProvider} electronProvider - Electron provider
     */
    function TransactionInfoComponent(snackBar, walletProvider, electronProvider) {
        this.snackBar = snackBar;
        this.walletProvider = walletProvider;
        this.electronProvider = electronProvider;
        /**
         * Interface details
         *
         * @var any
         */
        this.detail = {
            txID: null,
            status: false,
            block: undefined,
            timestamp: 0,
            amount: 0
        };
        /**
         * Stop update
         *
         * @var boolean
         */
        this.alive = true;
        /**
         * Use counter
         *
         * @var number
         */
        this.useCount = 0;
        /**
         * Max count update
         *
         * @var number
         */
        this.userMaxCount = 20;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    TransactionInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lottieConfig = {
            path: 'assets/animations/ripple_loading_animation.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.detail = {
            txID: this.transaction.txID,
            timestamp: this.transaction['raw_data']['timestamp'],
            block: 0,
            status: false,
            amount: this.transaction['raw_data']['contract'][0]['parameter']['value']['amount']
        };
        TimerObservable.create(0, 5000).pipe(takeWhile(function () { return _this.alive; })).subscribe(function () {
            if (_this.useCount > _this.userMaxCount) {
                _this.alive = false;
            }
            _this.walletProvider.getTx(_this.transaction.txID).then(function (tx) {
                _this.useCount++;
                _this.detail.status = tx.confirmed;
                _this.detail.block = tx.block;
                //If confirmation is received,
                // force updates.
                if (tx.confirmed === true) {
                    _this.alive = false;
                }
            }).catch(function () {
                console.log('Transaction not found');
            });
        });
    };
    /**
     * Copy ID Transaction
     *
     * @return void
     */
    TransactionInfoComponent.prototype.copyId = function (hash) {
        this.electronProvider.writeToClipboard(env.explorer.url + "/transaction/" + hash);
        this.snackBar.open('Tronscan url for this transaction copied to the clipboard', null, {
            duration: 2000,
            panelClass: ['snackbar-theme-dialog']
        });
    };
    /**
     * Forced stop of running processes
     *
     * @return void
     */
    TransactionInfoComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TransactionInfoComponent.prototype, "transaction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TransactionInfoComponent.prototype, "token", void 0);
    TransactionInfoComponent = __decorate([
        Component({
            selector: 'transaction-info',
            templateUrl: './transaction-info.component.html',
            styleUrls: ['./transaction-info.component.scss'],
        }),
        __metadata("design:paramtypes", [MatSnackBar,
            WalletProvider,
            ElectronProvider])
    ], TransactionInfoComponent);
    return TransactionInfoComponent;
}());
export { TransactionInfoComponent };
//# sourceMappingURL=transaction-info.component.js.map