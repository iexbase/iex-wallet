/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NgModule } from "@angular/core";

// directives
import {CopyToClipboard} from "./copy-to-clipboard/copy-to-clipboard";
import {MatSnackBarModule} from "@angular/material";



@NgModule({
    imports: [
        MatSnackBarModule
    ],
    declarations: [
        CopyToClipboard
    ],
    exports: [
        CopyToClipboard
    ]
})
export class DirectivesModule {}
