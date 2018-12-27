/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgModule } from "@angular/core";
import { PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MasterpageComponent } from "./masterpage/masterpage.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MomentModule } from "ngx-moment";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
} from "@angular/material";
import { SidenavComponent } from "./masterpage/sidenav/sidenav.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipesModule } from "@pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { TimeAgoPipe } from "time-ago-pipe";
import {DirectivesModule} from "@directives/directives.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const sharedModules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    InfiniteScrollModule,
    MomentModule,
    TranslateModule,
    RouterModule,
    PipesModule,
    DirectivesModule
];

const sharedMaterialModules = [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatRippleModule,
    MatSelectModule,
    MatButtonToggleModule
];

const sharedComponents = [
    MasterpageComponent,
    SidenavComponent
];

const sharedPipes = [
    TimeAgoPipe
];

@NgModule({
    imports: [
        ...sharedModules,
        ...sharedMaterialModules
    ],
    declarations: [
        ...sharedComponents,
        ...sharedPipes
    ],
    exports: [
        ...sharedModules,
        ...sharedMaterialModules,
        ...sharedComponents,
        ...sharedPipes
    ],

    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class SharedModule {}
