/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {NgModule} from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { ChartModule } from "angular-highcharts";

// Routing
import { HelpRoutingModule } from "./help-routing.module";

// Pages
import { HelpPage } from "./pages/help/help.page";

@NgModule({
    imports: [
        SharedModule,
        HelpRoutingModule,
        ChartModule
    ],
    declarations: [
        HelpPage
    ]
})
export class HelpModule { }
