/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SettingsActionsUnion, SettingsActionTypes} from './settings.actions';

export interface State extends EntityState<any> {}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: State = adapter.getInitialState();

// Section 2
export function reducer(state = initialState,
                        action: SettingsActionsUnion): State {
    switch (action.type) {
        case SettingsActionTypes.ADD_CONFIG: {
            return adapter.addOne(action.payload.config, state);
        }

        case SettingsActionTypes.UPDATE_CONFIG: {
            return adapter.updateOne(action.payload.config, state);
        }

        case SettingsActionTypes.DELETE_CONFIG: {
            return adapter.removeOne(action.payload.id, state);
        }

        default: {
            return state;
        }
    }
}


export const selectConfigState = createFeatureSelector<any>('settings');

export const { selectAll: selectAllConfigs, selectIds } = adapter.getSelectors(
    selectConfigState
);


export const findConfigById = (id) => createSelector(selectAllConfigs, (state) => {
    if (state) {
        return state.find(item => {
            return item.id === id;
        });
    } else {
        return {};
    }
});
