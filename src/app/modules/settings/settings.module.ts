/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
    NO_ERRORS_SCHEMA
} from '@angular/core';
import {
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { SharedModule } from '@shared/shared.module';

// Routing
import { SettingsRoutingModule } from './settings-routing.module';

// Pages
import { GravatarPage } from '@includes/gravatar/gravatar';
import { AddContactComponent } from '@modules/settings/components/add-contact/add-contact.component';
import { AddNodeComponent } from '@modules/settings/components/add-node/add-node.component';
import {EditContactComponent} from '@modules/settings/components/edit-contact/edit-contact.component';
import { AddressBookPage } from '@modules/settings/pages/address-book/address-book.page';
import { AltCurrencyPage } from '@modules/settings/pages/alt-currency/alt-currency.page';
import { LanguagePage } from '@modules/settings/pages/language/language.page';
import { NodePage } from '@modules/settings/pages/node/node.page';
import { SessionLogPage } from '@modules/settings/pages/session-log/session-log.page';
import { SettingsPage } from '@modules/settings/pages/settings/settings.page';
import { SkinsPage } from '@modules/settings/pages/skins/skins.page';

const settingsPage = [
    SettingsPage,
    AltCurrencyPage,
    AddressBookPage,
    LanguagePage,
    SessionLogPage,
    SkinsPage,
    NodePage,
    GravatarPage
];

const settingsComponent = [
    AddContactComponent,
    EditContactComponent,
    AddNodeComponent
];

const settingsMaterial = [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule
];

const settingsModules = [
    SharedModule,
    SettingsRoutingModule
];

@NgModule({
    imports: [
        ...settingsModules,
        ...settingsMaterial
    ],
    declarations: [
        ...settingsPage,
        ...settingsComponent
    ],

    entryComponents: [
        ...settingsComponent
    ],

    exports: [
        ...settingsModules
    ],

    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class SettingsModule { }
