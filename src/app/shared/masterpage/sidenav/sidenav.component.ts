/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy
{
    @Output() onMenuToggle = new EventEmitter();

    watcher: Subscription;
    activeMediaQuery: boolean;

    navs: {
        icon: string;
        link: string;
        name: string;
        external?: boolean;
        divider: boolean;
        sub_header: string;
        wallets: boolean;
    }[];

    constructor(
        media: MediaObserver
    ) {
        this.watcher = media.media$.subscribe((change: MediaChange) => {
            if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
                this.activeMediaQuery = true;
            } else {
                this.activeMediaQuery = false;
            }
        });

    }

    ngOnInit()
    {
        this.navs = [{
                icon: 'home',
                link: '/dashboard',
                name: 'Shared.Navigation.Dashboard',
                divider: false,
                sub_header: null,
                wallets: false
            },
            {
                icon: 'thumb_up',
                link: '/vote',
                name: 'Shared.Navigation.Votes',
                divider: false,
                sub_header: null,
                wallets: false
            },
            {
                icon: 'account_balance_wallet',
                link: '/wallet',
                name: 'Shared.Navigation.Wallet',
                divider: false,
                sub_header: null,
                wallets: true
            }, {
                icon: 'settings',
                link: '/settings',
                name: 'Shared.Navigation.Settings',
                divider: false,
                sub_header: null,
                wallets: false
            }, {
                icon: 'live_help',
                link: '/help',
                name: 'Shared.Navigation.Help',
                divider: false,
                sub_header: null,
                wallets: false
            }
        ];
    }

    ngOnDestroy() {
        this.watcher.unsubscribe();
    }
}
