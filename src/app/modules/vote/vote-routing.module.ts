import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {VotePage} from "@modules/vote/pages/vote/vote.page";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: VotePage
        }
    ])],
    exports: [RouterModule]
})
export class VoteRoutingModule { }
