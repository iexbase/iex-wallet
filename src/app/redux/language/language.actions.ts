/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Action} from "@ngrx/store";

export enum LanguageActionTypes {
    SET_LANGUAGE = '[Language] Set localization',
}

export class setLanguage implements Action {
    readonly type = LanguageActionTypes.SET_LANGUAGE;

    constructor(public payload: { language: any }) {}
}

export type LanguageActionsUnion =
    | setLanguage
