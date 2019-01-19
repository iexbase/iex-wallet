/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Update} from '@ngrx/entity';
import {Action} from '@ngrx/store';

export enum WalletActionTypes {
    LOAD_WALLETS = '[Wallet] Load Wallets',
    ADD_WALLET = '[Wallet] Add Wallet',
    UPSERT_WALLET = '[Wallet] Upsert Wallet',
    ADD_WALLETS = '[Wallet] Add Wallets',
    UPSERT_WALLETS = '[Wallet] Upsert Wallets',
    UPDATE_WALLET = '[Wallet] Update Wallet',
    UPDATE_WALLETS = '[Wallet] Update Wallets',
    DELETE_WALLET = '[Wallet] Delete Wallet',
    DELETE_WALLETS = '[Wallet] Delete Wallets',
    CLEAR_WALLETS = '[Wallet] Clear Wallets',
}

export class LoadWallets implements Action {
    readonly type = WalletActionTypes.LOAD_WALLETS;

    constructor(public payload: { wallets: any[] }) {}
}

export class AddWallet implements Action {
    readonly type = WalletActionTypes.ADD_WALLET;

    constructor(public payload: { wallet: any }) {}
}

export class UpsertWallet implements Action {
    readonly type = WalletActionTypes.UPSERT_WALLET;

    constructor(public payload: { wallet: any }) {}
}

export class AddWallets implements Action {
    readonly type = WalletActionTypes.ADD_WALLETS;

    constructor(public payload: { wallets: any[] }) {}
}

export class UpsertWallets implements Action {
    readonly type = WalletActionTypes.UPSERT_WALLETS;

    constructor(public payload: { wallets: any[] }) {}
}

export class UpdateWallet implements Action {
    readonly type = WalletActionTypes.UPDATE_WALLET;

    constructor(public payload: { wallet: Update<any> }) {}
}

export class UpdateWallets implements Action {
    readonly type = WalletActionTypes.UPDATE_WALLETS;

    constructor(public payload: { wallets: Array<Update<any>> }) {}
}

export class DeleteWallet implements Action {
    readonly type = WalletActionTypes.DELETE_WALLET;

    constructor(public payload: { id: string }) {}
}

export class DeleteWallets implements Action {
    readonly type = WalletActionTypes.DELETE_WALLETS;

    constructor(public payload: { ids: string[] }) {}
}

export class ClearWallets implements Action {
    readonly type = WalletActionTypes.CLEAR_WALLETS;
}

export type WalletActionsUnion =
    | LoadWallets
    | AddWallet
    | UpsertWallet
    | AddWallets
    | UpsertWallets
    | UpdateWallet
    | UpdateWallets
    | DeleteWallet
    | DeleteWallets
    | ClearWallets;
