var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import { createEntityAdapter } from "@ngrx/entity";
import { WalletActionTypes } from "./wallet.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export var adapter = createEntityAdapter();
export var initialState = adapter.getInitialState({
    // additional entity state properties
    selectedWalletId: null,
});
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case WalletActionTypes.ADD_WALLET: {
            return adapter.addOne(action.payload.wallet, state);
        }
        case WalletActionTypes.UPSERT_WALLET: {
            return adapter.upsertOne(action.payload.wallet, state);
        }
        case WalletActionTypes.ADD_WALLETS: {
            return adapter.addMany(action.payload.wallets, state);
        }
        case WalletActionTypes.UPSERT_WALLETS: {
            return adapter.upsertMany(action.payload.wallets, state);
        }
        case WalletActionTypes.UPDATE_WALLET: {
            return adapter.updateOne(action.payload.wallet, state);
        }
        case WalletActionTypes.UPDATE_WALLETS: {
            return adapter.updateMany(action.payload.wallets, state);
        }
        case WalletActionTypes.DELETE_WALLET: {
            return adapter.removeOne(action.payload.id, state);
        }
        case WalletActionTypes.DELETE_WALLETS: {
            return adapter.removeMany(action.payload.ids, state);
        }
        case WalletActionTypes.LOAD_WALLETS: {
            return adapter.addAll(action.payload.wallets, state);
        }
        case WalletActionTypes.CLEAR_WALLETS: {
            return adapter.removeAll(__assign({}, state, { selectedWalletId: null }));
        }
        default: {
            return state;
        }
    }
}
export var selectWalletState = createFeatureSelector('wallets');
export var selectAllWallets = (_a = adapter.getSelectors(selectWalletState), _a.selectAll), selectIds = _a.selectIds;
export var getSelectedWallet = createSelector(selectWalletState, function (state) {
    return state.entities[state.selectedWalletId];
});
export var findWalletByAddress = function (id) { return createSelector(selectAllWallets, function (state) {
    if (state) {
        return state.find(function (item) {
            return item.address === id;
        });
    }
    else {
        return {};
    }
}); };
//# sourceMappingURL=wallet.reducer.js.map