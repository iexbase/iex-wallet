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
import { AddressProvider } from "@providers/address/address";
import { ConfigProvider } from "@providers/config/config";
import { ElectronProvider } from "@providers/electron/electron";
import { WalletProvider } from "@providers/wallet/wallet";
var TransferAssetComponent = /** @class */ (function () {
    /**
     * Create a new TransferAssetComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {ElectronProvider} electron - Electron provider
     * @param {ConfigProvider} config - Config provider
     * @param {Store} store - Reactive service
     * @param {AddressProvider} addressProvider - Address provider
     * @param {any} data - Additional parameters received
     */
    function TransferAssetComponent(dialogRef, walletProvider, snackBar, electron, config, store, addressProvider, data) {
        this.dialogRef = dialogRef;
        this.walletProvider = walletProvider;
        this.snackBar = snackBar;
        this.electron = electron;
        this.config = config;
        this.store = store;
        this.addressProvider = addressProvider;
        this.data = data;
        /**
         * Received data from the main source
         *
         * @var any
         */
        this.wallet = {};
        /**
         * Transaction Confirmation Status
         *
         * @var boolean
         */
        this.isConfirmed = false;
        /**
         * Button lock status
         *
         * @var boolean
         */
        this.isButtonDisabled = false;
        /**
         * Transaction Successful Transaction Status
         *
         * @var boolean
         */
        this.isSuccess = false;
        /**
         * Status of receipt of transaction details
         *
         * @var boolean
         */
        this.isTransactionInfo = false;
        /**
         * Available fields to fill
         *
         * @var any
         */
        this.fields = {
            token: 'TRX',
            toAddress: '',
            amount: 0
        };
        /**
         * Details for confirmation
         *
         * @var any
         */
        this.confirmDetails = {};
        /**
         * List available tokens
         *
         * @var any[]
         */
        this.listTokens = [];
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
    TransferAssetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.wallet = this.data;
        // Balance update
        this.updateBalance();
        this.walletProvider.getAccount(this.data.address).then(function (account) {
            _this.listTokens = account.asset || [];
            _this.listTokens = _this.listTokens.filter(function (filter) { return filter.key != 'TRX'; });
            _this.listTokens.unshift({
                'key': 'TRX',
                'value': account['balance']
            });
        });
    };
    /**
     * Sending the entire amount
     *
     * @return void
     */
    TransferAssetComponent.prototype.sendMax = function () {
        var _this = this;
        this.useSendMax = true;
        var item = this.listTokens.filter(function (filter) {
            return filter.key == _this.fields.token;
        })[0];
        if (this.fields.token.toUpperCase() == 'TRX')
            this.fields.amount = item.value / 1e6;
        else {
            this.fields.amount = item.value;
        }
    };
    /**
     * Go to transaction confirmation
     *
     * @return void
     */
    TransferAssetComponent.prototype.goToConfirm = function () {
        var _this = this;
        this.isButtonDisabled = true;
        this.walletProvider.createTx({
            tokenID: this.fields.token,
            amount: this.fields.amount,
            toAddress: this.fields.toAddress,
        }, this.wallet.address).then(function (result) {
            _this.signedTransaction = result;
            // confirmed data
            _this.confirmDetails = {
                id: result.txID,
                timestamp: result.raw_data.timestamp,
                type: result.raw_data.contract[0].type,
                amount: result.raw_data.contract[0].parameter.value.amount,
                toAddress: result.raw_data.contract[0].parameter.value.to_address,
                ownerAddress: result.raw_data.contract[0].parameter.value.owner_address,
                token: _this.fields.token,
                data: '~'
            };
            _this.isButtonDisabled = false;
            _this.isConfirmed = true;
        }).catch(function (err) {
            _this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
            _this.isButtonDisabled = false;
            _this.isConfirmed = false;
        });
    };
    /**
     * Confirm and send transactions to the network
     *
     * @return void
     */
    TransferAssetComponent.prototype.submitTransaction = function () {
        var _this = this;
        this.isButtonDisabled = true;
        this.isConfirmed = true;
        this.walletProvider.signTx(this.signedTransaction).then(function (signed) {
            if ('signature' in signed) {
                _this.walletProvider.broadcastTx(signed).then(function (broadcast) {
                    if (broadcast.result == true) {
                        _this.updateBalance();
                        _this.isButtonDisabled = false;
                        _this.isSuccess = true;
                        setTimeout(function () {
                            _this.isTransactionInfo = true;
                        }, 2000);
                    }
                });
            }
        }).catch(function (err) {
            _this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
        });
    };
    /**
     * Update balance
     *
     * @return void
     */
    TransferAssetComponent.prototype.updateBalance = function () {
        var _this = this;
        this.walletProvider.getBalance(this.wallet.address).then(function (result) {
            _this.walletProvider.updateWallet(_this.wallet.address, {
                balance: result
            }).then(function (result) {
                var update = {
                    id: _this.wallet.id,
                    changes: {
                        balance: result.balance
                    }
                };
                _this.store.dispatch(new WalletActions.UpdateWallet({ wallet: update }));
            });
        });
    };
    /**
     * Sent button status
     *
     * @return boolean
     */
    TransferAssetComponent.prototype.enabledSend = function () {
        return this.fields.toAddress.length == 0 ||
            this.isButtonDisabled == true ||
            this.addressProvider.validateAddress(this.fields.toAddress) == false ||
            this.fields.amount == 0;
    };
    /**
     * Come back
     *
     * @return void
     */
    TransferAssetComponent.prototype.onBack = function () {
        this.isConfirmed = false;
    };
    /**
     * Close modal
     *
     * @return void
     */
    TransferAssetComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    TransferAssetComponent = __decorate([
        Component({
            selector: 'transfer-asset',
            templateUrl: './transfer-asset.component.html',
            styleUrls: ['./transfer-asset.component.scss'],
        }),
        __param(7, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            WalletProvider,
            MatSnackBar,
            ElectronProvider,
            ConfigProvider,
            Store,
            AddressProvider, Object])
    ], TransferAssetComponent);
    return TransferAssetComponent;
}());
export { TransferAssetComponent };
//# sourceMappingURL=transfer-asset.component.js.map