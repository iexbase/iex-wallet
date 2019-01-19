/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPage } from '@modules/login/pages/login/login.page';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: LoginPage
        }
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
