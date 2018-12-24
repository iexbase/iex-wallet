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
import { select, Store } from "@ngrx/store";
// Redux
import * as fromWallet from "@redux/wallet/wallet.reducer";
import * as WalletActions from "@redux/wallet/wallet.actions";
// Providers
import { TronProvider } from "@providers/tron/tron";
import { WalletProvider } from "@providers/wallet/wallet";
// Available Freeze types
var FreezeType;
(function (FreezeType) {
    FreezeType[FreezeType["FreezeBandwidth"] = 1] = "FreezeBandwidth";
    FreezeType[FreezeType["FreezeEnergy"] = 2] = "FreezeEnergy";
    FreezeType[FreezeType["UnfreezeBandwidth"] = 3] = "UnfreezeBandwidth";
    FreezeType[FreezeType["UnfreezeEnergy"] = 4] = "UnfreezeEnergy";
})(FreezeType || (FreezeType = {}));
var FreezeBalanceComponent = /** @class */ (function () {
    /**
     * Create a new FreezeBalanceComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {Store} store - Reactive provider
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {TronProvider} tron - TronProvider
     * @param {MatSnackBar} snackBar - Snack bar service
     * @param {any} data - Additional parameters received
     */
    function FreezeBalanceComponent(dialogRef, store, walletProvider, tron, snackBar, data) {
        this.dialogRef = dialogRef;
        this.store = store;
        this.walletProvider = walletProvider;
        this.tron = tron;
        this.snackBar = snackBar;
        this.data = data;
        /**
         * Fields list
         *
         * @var any
         */
        this.fields = {
            amount: undefined,
            resource: 'BANDWIDTH'
        };
        /**
         * Types of freezing
         *
         * @var any
         */
        this.freezes = [
            {
                key: 'BANDWIDTH',
                value: 'Bandwidth'
            },
            {
                key: 'ENERGY',
                value: 'Energy'
            }
        ];
        /**
         * Used total power
         *
         * @var number
         */
        this.userTotalPower = 0;
        /**
         * New total power
         *
         * @var number
         */
        this.newTotalPower = 0;
        /**
         * Expire Time frozen
         *
         * @var number
         */
        this.expireTime = 0;
        /**
         * Custom energy
         *
         * @var number
         */
        this.energyBalance = 0;
        /**
         * Expire Time Energy
         *
         * @var number
         */
        this.expireEnergyTime = 0;
        /**
         * Freeze Confirmation
         *
         * @var boolean
         */
        this.isConfirm = false;
        /**
         * Freeze Successful
         *
         * @var boolean
         */
        this.isSuccess = false;
        /**
         * Current time
         *
         * @var number | string
         */
        this.now = new Date();
        this.lottieConfig = {
            path: 'assets/animations/checked_done_.json',
            renderer: 'canvas',
            autoplay: true,
            loop: false
        };
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    FreezeBalanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Account balance update
        this.findAndUpdateBalance();
        this.walletProvider.getAccount(this.data.address).then(function (result) {
            if (result['frozen'] && result['frozen'][0]['frozen_balance']) {
                _this.userTotalPower = Number(_this.tron.fromSun(result['frozen'][0]['frozen_balance']));
                _this.newTotalPower = _this.userTotalPower;
                _this.expireTime = result['frozen'][0]['expire_time'];
            }
            if (result['account_resource'] && result['account_resource']['frozen_balance_for_energy']) {
                var resource = result['account_resource']['frozen_balance_for_energy'];
                _this.energyBalance = _this.tron.fromSun(resource['frozen_balance']);
                _this.expireEnergyTime = resource['expire_time'];
            }
        });
    };
    /**
     * Change bandwidth value
     * Note: Only available for "Bandwidth"
     *
     * @return void
     */
    FreezeBalanceComponent.prototype.onChangePower = function () {
        this.newTotalPower = this.userTotalPower + Number(this.fields.amount);
    };
    /**
     * Change resource type
     *
     * @param {string} value - new resource (ENERGY or BANDWIDTH)
     * @return void
     */
    FreezeBalanceComponent.prototype.onResourceChange = function (value) {
        this.fields.resource = value;
    };
    /**
     *  We start the process of freezing the balance
     *
     *  @return void
     */
    FreezeBalanceComponent.prototype.goToFreeze = function () {
        var _this = this;
        this.tron.freezeBalance(this.fields.amount, 3, this.fields.resource, this.data.address).then(function (freeze) {
            _this.walletProvider.signTx(freeze).then(function (signTx) {
                _this.walletProvider.broadcastTx(signTx).then(function (broadcastTX) {
                    if (broadcastTX.result == true) {
                        // determine the type of freezing
                        _this.type = _this.fields.resource.toUpperCase() == 'BANDWIDTH'
                            ? FreezeType.FreezeBandwidth : FreezeType.FreezeEnergy;
                        _this.isSuccess = true;
                    }
                });
            }).catch(function (err) {
                _this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
            });
        }).catch(function (err) {
            _this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
        });
    };
    /**
     *  We start the process of defrosting the balance
     *
     *  @param {string} resource - Resource type
     *  @return void
     */
    FreezeBalanceComponent.prototype.goToUnfreeze = function (resource) {
        var _this = this;
        console.log(resource.toUpperCase());
        if (!['ENERGY', 'BANDWIDTH'].includes(resource.toUpperCase())) {
            this.snackBar.open('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"', null, {
                duration: 2000,
                panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
            return;
        }
        this.tron.unfreezeBalance(resource.toUpperCase(), this.data.address).then(function (unfreeze) {
            _this.walletProvider.signTx(unfreeze).then(function (signTX) {
                _this.walletProvider.broadcastTx(signTX).then(function (broadcastTX) {
                    if (broadcastTX.result == true) {
                        // determine the type of freezing
                        _this.type = resource.toUpperCase() == 'BANDWITH'
                            ? FreezeType.UnfreezeBandwidth : FreezeType.UnfreezeEnergy;
                        _this.isSuccess = true;
                    }
                });
            }).catch(function (err) {
                _this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
            });
        }).catch(function (err) {
            _this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
        });
    };
    /**
     * Button activation status
     *
     * @return boolean
     */
    FreezeBalanceComponent.prototype.enabledBalance = function () {
        return this.fields.amount == 0 ||
            this.fields.amount == undefined ||
            !this.isConfirm ||
            Number(this.fields.amount) > Number(this.walletId.balance / 1e6);
    };
    /**
     * Balance update
     *
     * @return void
     */
    FreezeBalanceComponent.prototype.findAndUpdateBalance = function () {
        var _this = this;
        this.walletProvider.getBalance(this.data.address).then(function (result) {
            _this.walletProvider.updateWallet(_this.data.address, {
                balance: result
            }).then(function (result) {
                var update = {
                    id: result.id,
                    changes: {
                        balance: result.balance
                    }
                };
                _this.store.dispatch(new WalletActions.UpdateWallet({ wallet: update }));
            });
        });
        // Get find wallet by Address
        this.store.pipe(select(fromWallet.findWalletByAddress(this.data.address)))
            .subscribe(function (account) {
            _this.walletId = account;
        });
    };
    /**
     * Close modal
     *
     * @return void
     */
    FreezeBalanceComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    FreezeBalanceComponent = __decorate([
        Component({
            selector: 'freeze-balance',
            templateUrl: './freeze-balance.component.html',
            styleUrls: ['./freeze-balance.component.scss'],
        }),
        __param(5, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            Store,
            WalletProvider,
            TronProvider,
            MatSnackBar, Object])
    ], FreezeBalanceComponent);
    return FreezeBalanceComponent;
}());
export { FreezeBalanceComponent };
//# sourceMappingURL=freeze-balance.component.js.map