/**
 * Copyright (c) 2018 iEXBase
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MasterpageComponent} from "@shared/masterpage/masterpage.component";
import {AuthGuardService} from "./auth-guard.service";



const routes: Routes = [{
        path: 'login', loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: '',
        component: MasterpageComponent,
        canActivate: [AuthGuardService],
        children: [

            { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'},
            { path: 'wallet', loadChildren: './modules/wallet/wallet.module#WalletModule'},
            { path: 'vote', loadChildren: './modules/vote/vote.module#VoteModule'},
            { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule'},
            { path: 'help', loadChildren: './modules/help/help.module#HelpModule'},
            // Fallback when no prior route is matched
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            initialNavigation: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
