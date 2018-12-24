/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MatFormFieldModule, MatSelectModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

// Modules shared
import { SharedModule } from "@shared/shared.module";

// Router
import { LoginRoutingModule } from "@modules/login/login-routing.module";
import { LoginPage } from "@modules/login/pages/login/login.page";

// Components
import { CreateAccountComponent } from "@modules/login/components/create-account/create-account.component";
import { LoginAccountComponent } from "@modules/login/components/login-account/login-account.component";

@NgModule({
    imports: [
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
    declarations: [
        LoginPage,
        CreateAccountComponent,
        LoginAccountComponent
    ]
})
export class LoginModule { }
