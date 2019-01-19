/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import {RateActionsUnion, RateActionTypes} from '../rates/rates.actions';


export interface State extends EntityState<any> {}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: State = adapter.getInitialState();

// Section 2
export function reducer(state = initialState,
                        action: RateActionsUnion): State {
    switch (action.type) {
        case RateActionTypes.ADD_RATE: {
            return adapter.addOne(action.payload.rate, state);
        }

        case RateActionTypes.ADD_RATES: {
            return adapter.addMany(action.payload.rates, state);
        }

        case RateActionTypes.UPDATE_RATE: {
            return adapter.updateOne(action.payload.rate, state);
        }

        case RateActionTypes.UPDATE_RATES: {
            return adapter.updateMany(action.payload.rates, state);
        }

        case RateActionTypes.DELETE_RATE: {
            return adapter.removeOne(action.payload.id, state);
        }

        case RateActionTypes.DELETE_RATES: {
            return adapter.removeMany(action.payload.ids, state);
        }

        default: {
            return state;
        }
    }
}


export const selectRateState = createFeatureSelector<any>('rates');

export const { selectAll: selectAllRates, selectIds } = adapter.getSelectors(
    selectRateState
);
