/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HelpPage} from "./pages/help/help.page";

const Routes: Routes = [
    { path: '', component: HelpPage }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})
export class HelpRoutingModule { }
