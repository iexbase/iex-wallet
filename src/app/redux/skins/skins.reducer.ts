/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {SkinActionsUnion, SkinActionTypes} from "./skins.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface State extends EntityState<any> {}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: State = adapter.getInitialState();

// Section 2
export function reducer(state = initialState,
                        action: SkinActionsUnion): State {
    switch (action.type) {
        case SkinActionTypes.ADD_SKIN: {
            return adapter.addOne(action.payload.skin, state);
        }

        case SkinActionTypes.UPDATE_SKIN: {
            return adapter.updateOne(action.payload.skin, state);
        }

        case SkinActionTypes.DELETE_SKIN: {
            return adapter.removeOne(action.payload.id, state);
        }

        default: {
            return state;
        }
    }
}


export const selectSkinState = createFeatureSelector<any>('skins');

export const { selectAll: selectAllSkins, selectIds } = adapter.getSelectors(
    selectSkinState
);


export const findSkinById = (id) => createSelector(selectAllSkins, (state) => {
    if (state) {
        return state.find(item => {
            return item.id === id;
        });
    } else {
        return {};
    }
});
