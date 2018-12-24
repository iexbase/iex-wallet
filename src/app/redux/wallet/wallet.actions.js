export var WalletActionTypes;
(function (WalletActionTypes) {
    WalletActionTypes["LOAD_WALLETS"] = "[Wallet] Load Wallets";
    WalletActionTypes["ADD_WALLET"] = "[Wallet] Add Wallet";
    WalletActionTypes["UPSERT_WALLET"] = "[Wallet] Upsert Wallet";
    WalletActionTypes["ADD_WALLETS"] = "[Wallet] Add Wallets";
    WalletActionTypes["UPSERT_WALLETS"] = "[Wallet] Upsert Wallets";
    WalletActionTypes["UPDATE_WALLET"] = "[Wallet] Update Wallet";
    WalletActionTypes["UPDATE_WALLETS"] = "[Wallet] Update Wallets";
    WalletActionTypes["DELETE_WALLET"] = "[Wallet] Delete Wallet";
    WalletActionTypes["DELETE_WALLETS"] = "[Wallet] Delete Wallets";
    WalletActionTypes["CLEAR_WALLETS"] = "[Wallet] Clear Wallets";
})(WalletActionTypes || (WalletActionTypes = {}));
var LoadWallets = /** @class */ (function () {
    function LoadWallets(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.LOAD_WALLETS;
    }
    return LoadWallets;
}());
export { LoadWallets };
var AddWallet = /** @class */ (function () {
    function AddWallet(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.ADD_WALLET;
    }
    return AddWallet;
}());
export { AddWallet };
var UpsertWallet = /** @class */ (function () {
    function UpsertWallet(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.UPSERT_WALLET;
    }
    return UpsertWallet;
}());
export { UpsertWallet };
var AddWallets = /** @class */ (function () {
    function AddWallets(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.ADD_WALLETS;
    }
    return AddWallets;
}());
export { AddWallets };
var UpsertWallets = /** @class */ (function () {
    function UpsertWallets(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.UPSERT_WALLETS;
    }
    return UpsertWallets;
}());
export { UpsertWallets };
var UpdateWallet = /** @class */ (function () {
    function UpdateWallet(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.UPDATE_WALLET;
    }
    return UpdateWallet;
}());
export { UpdateWallet };
var UpdateWallets = /** @class */ (function () {
    function UpdateWallets(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.UPDATE_WALLETS;
    }
    return UpdateWallets;
}());
export { UpdateWallets };
var DeleteWallet = /** @class */ (function () {
    function DeleteWallet(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.DELETE_WALLET;
    }
    return DeleteWallet;
}());
export { DeleteWallet };
var DeleteWallets = /** @class */ (function () {
    function DeleteWallets(payload) {
        this.payload = payload;
        this.type = WalletActionTypes.DELETE_WALLETS;
    }
    return DeleteWallets;
}());
export { DeleteWallets };
var ClearWallets = /** @class */ (function () {
    function ClearWallets() {
        this.type = WalletActionTypes.CLEAR_WALLETS;
    }
    return ClearWallets;
}());
export { ClearWallets };
//# sourceMappingURL=wallet.actions.js.map