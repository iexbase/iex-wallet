/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    RouterModule,
    Routes
} from "@angular/router";
import { NgModule } from "@angular/core";

import { SettingsPage } from "@modules/settings/pages/settings/settings.page";
import { AltCurrencyPage } from "@modules/settings/pages/alt-currency/alt-currency.page";
import { LanguagePage } from "@modules/settings/pages/language/language.page";
import { SessionLogPage } from "@modules/settings/pages/session-log/session-log.page";
import { SkinsPage } from "@modules/settings/pages/skins/skins.page";
import {AddressBookPage} from "@modules/settings/pages/address-book/address-book.page";

const routes: Routes = [
    {
        path: '', component: SettingsPage,
        children: [
            {
                path: 'alt-currency',
                component: AltCurrencyPage
            },
            {
                path: 'language',
                component: LanguagePage
            },
            {
                path: 'address-book',
                component: AddressBookPage
            },
            {
                path: 'session-log',
                component: SessionLogPage
            },
            {
                path: 'skins',
                component: SkinsPage
            }
        ]
    }];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
