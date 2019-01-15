/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LottieAnimationViewModule } from "ng-lottie";


// Modules
import { VotePage } from "@modules/vote/pages/vote/vote.page";
import { VoteRoutingModule } from "@modules/vote/vote-routing.module";
import { VoteDetailComponent } from "@modules/vote/components/vote-detail/vote-detail.component";
import { VoteConfirmComponent } from "@modules/vote/components/vote-confirm/vote-confirm.component";

@NgModule({
    imports: [
        SharedModule,
        LottieAnimationViewModule.forRoot(),
        VoteRoutingModule,
        FlexLayoutModule
    ],
    declarations: [
        VotePage,
        VoteDetailComponent,
        VoteConfirmComponent
    ],

    entryComponents: [
        VoteDetailComponent
    ]
})
export class VoteModule { }
