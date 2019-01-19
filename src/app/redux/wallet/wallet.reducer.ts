/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WalletActionsUnion, WalletActionTypes} from './wallet.actions';

export interface State extends EntityState<any> {
    // additional entities state properties
    selectedWalletId: number | null;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedWalletId: null,
});

export function reducer(state = initialState, action: WalletActionsUnion): State {
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
            return adapter.removeAll({ ...state, selectedWalletId: null });
        }

        default: {
            return state;
        }
    }
}

export const selectWalletState = createFeatureSelector<any>('wallets');

export const { selectAll: selectAllWallets, selectIds } = adapter.getSelectors(
    selectWalletState
);

export const getSelectedWallet = createSelector(
    selectWalletState,
    (state) => {
        return state.entities[state.selectedWalletId];
    }
);

export const findWalletByAddress = (id) => createSelector(selectAllWallets, (state) => {
    if (state) {
        return state.find(item => {
            return item.address === id;
        });
    } else {
        return {};
    }
});
