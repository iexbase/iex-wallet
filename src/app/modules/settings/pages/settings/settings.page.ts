/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from "@angular/core";
import { LocalStorage } from "ngx-webstorage";
import { Router } from "@angular/router";


// Interface navigation
export interface NavigationInterface {
    link: string;
    name: string;
    external?: boolean;
}

@Component({
    selector: 'settings-page',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit
{
    /**
     *  Active page in settings
     *
     *  @var string
     */
    @LocalStorage()
    private settingsView:string;

    /**
     *  Navigation Settings
     *
     *  @var NavigationInterface[]
     */
    navs: NavigationInterface[];

    /**
     * Object creation SettingsPage
     *
     * @param {Router} router - Router provider
     */
    constructor(
        private router: Router
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit(): void
    {
        this.navs = [{
            link: '/settings/alt-currency',
            name: 'Settings.Navigation.Currency',
        }, {
            link: '/settings/language',
            name: 'Settings.Navigation.Language'
        }, {
            link: '/settings/address-book',
            name: 'Settings.Navigation.AddressBook'
        }, {
            link: '/settings/session-log',
            name: 'Settings.Navigation.SessionLog'
        }, {
            link: '/settings/skins',
            name: 'Settings.Navigation.Skins'
        }, {
            link: '/settings/skins',
            name: 'Settings.Navigation.Skins'
        }, {
            link: '/settings/skins',
            name: 'Settings.Navigation.Skins'
        }];

        if (this.settingsView != undefined) {
            this.router.navigate([`/settings/${this.settingsView}`]);
        } else {
            this.router.navigate([`/settings/alt-currency`]);
        }
    }
}
