/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LanguageActionsUnion, LanguageActionTypes} from "./language.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface State extends EntityState<any> {}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: State = adapter.getInitialState();

// Section 2
export function reducer(state = initialState,
                        action: LanguageActionsUnion): State {
    switch (action.type) {
        case LanguageActionTypes.SET_LANGUAGE: {
            return adapter.addOne(action.payload.language, state);
        }

        default: {
            return state;
        }
    }
}

export const selectLanguageState = createFeatureSelector<any>('password');


export const { selectAll: selectAllLanguage } = adapter.getSelectors(
    selectLanguageState
);

export const getLanguage = (id) => createSelector(selectAllLanguage, (state) => {
    if (state) {
        return state.find(item => {
            return item.id === id;
        });
    } else {
        return {};
    }
});
