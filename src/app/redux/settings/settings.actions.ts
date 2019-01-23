/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Update} from '@ngrx/entity';
import {Action} from '@ngrx/store';

export enum SettingsActionTypes {
    ADD_CONFIG = '[Settings] Add Config',
    UPDATE_CONFIG = '[Settings] Update Config',
    DELETE_CONFIG = '[Settings] Delete Config',
}

export class AddConfig implements Action {
    readonly type = SettingsActionTypes.ADD_CONFIG;

    constructor(public payload: { config: any }) {}
}

export class UpdateConfig implements Action {
    readonly type = SettingsActionTypes.UPDATE_CONFIG;

    constructor(public payload: { config: Update<any> }) {}
}


export class DeleteConfig implements Action {
    readonly type = SettingsActionTypes.DELETE_CONFIG;

    constructor(public payload: { id: string }) {}
}


export type SettingsActionsUnion =
    | AddConfig
    | UpdateConfig
    | DeleteConfig;

