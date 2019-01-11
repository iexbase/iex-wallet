/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Action} from "@ngrx/store";
import {Update} from "@ngrx/entity";

export enum NodeActionTypes {
    ADD_NODE = '[Node] Add node',
    UPDATE_NODE = '[Node] Update Node',
    DELETE_NODE = '[Node] Delete Node',
}

export class AddNode implements Action {
    readonly type = NodeActionTypes.ADD_NODE;

    constructor(public payload: { node: any }) {}
}

export class UpdateNode implements Action {
    readonly type = NodeActionTypes.UPDATE_NODE;

    constructor(public payload: { node: Update<any> }) {}
}


export class DeleteNode implements Action {
    readonly type = NodeActionTypes.DELETE_NODE;

    constructor(public payload: { id: string }) {}
}

export type NodeActionsUnion =
    | AddNode
    | UpdateNode
    | DeleteNode
