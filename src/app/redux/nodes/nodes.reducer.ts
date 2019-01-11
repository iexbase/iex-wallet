/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {NodeActionsUnion, NodeActionTypes} from "./nodes.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface State extends EntityState<any> {}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: State = adapter.getInitialState();

// Section 2
export function reducer(state = initialState,
                        action: NodeActionsUnion): State {
    switch (action.type) {
        case NodeActionTypes.ADD_NODE: {
            return adapter.addOne(action.payload.node, state);
        }

        case NodeActionTypes.UPDATE_NODE: {
            return adapter.updateOne(action.payload.node, state);
        }

        case NodeActionTypes.DELETE_NODE: {
            return adapter.removeOne(action.payload.id, state);
        }

        default: {
            return state;
        }
    }
}


export const selectNodeState = createFeatureSelector<any>('nodes');

export const { selectAll: selectAllNodes, selectIds } = adapter.getSelectors(
    selectNodeState
);


export const findNodeById = (id) => createSelector(selectAllNodes, (state) => {
    if (state) {
        return state.find(item => {
            return item.id === id;
        });
    } else {
        return {};
    }
});
