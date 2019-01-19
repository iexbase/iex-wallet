/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Modules
import { VotePage } from '@modules/vote/pages/vote/vote.page';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '',  component: VotePage }
    ])],
    exports: [RouterModule]
})
export class VoteRoutingModule { }
