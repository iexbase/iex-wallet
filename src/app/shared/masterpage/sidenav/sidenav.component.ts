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

    navigation: {
        icon: string;
        link: string;
        name: string;
        separator: boolean;
    }[];

    /**
     * Create a new SidenavComponent object
     *
     * @param {MediaObserver} media - Media Observer service
     */
    constructor(
        media: MediaObserver
    ) {
        this.watcher = media.media$.subscribe((change: MediaChange) => {
            this.activeMediaQuery = change.mqAlias === 'xs' || change.mqAlias === 'sm';
        });
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit()
    {
        this.navigation = [
            { icon: 'home', link: '/dashboard', name: 'Shared.Navigation.Dashboard', separator: false },
            { icon: 'thumb_up', link: '/vote', name: 'Shared.Navigation.Votes', separator: false },
            { icon: 'account_balance_wallet', link: '/wallet', name: 'Shared.Navigation.Wallet', separator: true },
            { icon: 'settings', link: '/settings', name: 'Shared.Navigation.Settings', separator: false },
            { icon: 'live_help', link: '/help', name: 'Shared.Navigation.Help', separator: false }
        ];
    }

    ngOnDestroy() {
        this.watcher.unsubscribe();
    }
}
