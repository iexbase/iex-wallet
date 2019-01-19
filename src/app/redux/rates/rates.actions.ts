/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export enum RateActionTypes {
    ADD_RATE = '[Rate] Add Rate',
    ADD_RATES = '[Rate] Add Rates',
    UPDATE_RATE = '[Rate] Update Rate',
    UPDATE_RATES = '[Rate] Update Rates',
    DELETE_RATE = '[Rate] Delete Rate',
    DELETE_RATES = '[Rate] Delete Rates',
    CLEAR_RATES = '[Rate] Clear Rates'
}

export class AddRate implements Action {
    readonly type = RateActionTypes.ADD_RATE;

    constructor(public payload: { rate: any }) {}
}

export class AddRates implements Action {
    readonly type = RateActionTypes.ADD_RATES;

    constructor(public payload: { rates: any[] }) {}
}

export class UpdateRate implements Action {
    readonly type = RateActionTypes.UPDATE_RATE;

    constructor(public payload: { rate: Update<any> }) {}
}

export class UpdateRates implements Action {
    readonly type = RateActionTypes.UPDATE_RATES;

    constructor(public payload: { rates: Array<Update<any>> }) {}
}

export class DeleteRate implements Action {
    readonly type = RateActionTypes.DELETE_RATE;

    constructor(public payload: { id: string }) {}
}

export class DeleteRates implements Action {
    readonly type = RateActionTypes.DELETE_RATES;

    constructor(public payload: { ids: string[] }) {}
}

export class ClearRates implements Action {
    readonly type = RateActionTypes.CLEAR_RATES;
}

export type RateActionsUnion =
    | AddRate
    | AddRates
    | UpdateRate
    | UpdateRates
    | DeleteRate
    | DeleteRates
    | ClearRates;
