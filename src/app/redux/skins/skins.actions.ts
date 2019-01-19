/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Update} from '@ngrx/entity';
import {Action} from '@ngrx/store';

export enum SkinActionTypes {
    ADD_SKIN = '[Skins] Add Skin',
    UPDATE_SKIN = '[Skins] Update Skin',
    DELETE_SKIN = '[Skins] Delete Skin',
}

export class AddSkin implements Action {
    readonly type = SkinActionTypes.ADD_SKIN;

    constructor(public payload: { skin: any }) {}
}

export class UpdateSkin implements Action {
    readonly type = SkinActionTypes.UPDATE_SKIN;

    constructor(public payload: { skin: Update<any> }) {}
}


export class DeleteSkin implements Action {
    readonly type = SkinActionTypes.DELETE_SKIN;

    constructor(public payload: { id: string }) {}
}


export type SkinActionsUnion =
    | AddSkin
    | UpdateSkin
    | DeleteSkin;

