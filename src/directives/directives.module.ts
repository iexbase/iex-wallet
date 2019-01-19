/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';

// directives
import { ExternalizeLinks } from '@directives/externalize-links/externalize-links';
import {LongPress} from '@directives/long-press/long-press';
import { OnlyNumber } from '@directives/only-number/only-number';
import { CopyToClipboard } from './copy-to-clipboard/copy-to-clipboard';


export const constDirectives = [
    CopyToClipboard,
    OnlyNumber,
    ExternalizeLinks,
    LongPress
];

@NgModule({
    imports: [
        MatSnackBarModule
    ],
    declarations: [
        ...constDirectives
    ],
    exports: [
        ...constDirectives
    ]
})
export class DirectivesModule {}
