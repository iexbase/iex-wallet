import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {MatFormFieldModule, MatSelectModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {VotePage} from "@modules/vote/pages/vote/vote.page";
import {VoteRoutingModule} from "@modules/vote/vote-routing.module";


@NgModule({
    imports: [
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        VoteRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
    declarations: [
        VotePage
    ]
})
export class VoteModule { }
