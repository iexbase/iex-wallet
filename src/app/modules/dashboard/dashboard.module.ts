/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {NgModule} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ChartModule } from 'angular-highcharts';

// Routing
import { DashboardRoutingModule } from './dashboard-routing.module';

// Pages
import { DashboardPage } from './pages/dashboard/dashboard.page';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutingModule,
        ChartModule
    ],
    declarations: [
        DashboardPage
    ]
})
export class DashboardModule { }
