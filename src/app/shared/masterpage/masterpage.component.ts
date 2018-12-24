/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { Observable, of } from "rxjs";
import { select, Store } from "@ngrx/store";

// redux
import * as fromSkin from "@redux/skins/skins.reducer";
import { AppState } from "@redux/index";

// Interface selected skin
export interface SelectedSkin {
    id: number;
    name: string;
}

@Component({
    selector: 'app-masterpage',
    templateUrl: './masterpage.component.html',
    styleUrls: ['./masterpage.component.scss']
})
export class MasterpageComponent implements OnInit
{
    /**
     * Mode of the drawer; one of 'over', 'push' or 'side'.
     *
     * @var Observable
     */
    sidenavMode$: Observable<string> = of('over');

    /**
     * Whether the drawer is opened.
     * We overload this because we trigger an event when it starts or end.
     *
     * @var Observable
     */
    sidenavOpen$: Observable<boolean> = of(false);

    /**
     * Details Selected Main Subject
     *
     * @var SelectedSkin
     */
    selectedSkin: SelectedSkin;

    /**
     * Create a new MasterpageComponent object
     *
     * @param {Store} store - Reactive service
     * @param {BreakpointObserver} breakpointObserver - Utility for checking the matching state of @media queries.
     */
    constructor(
        protected store: Store<AppState>,
        private breakpointObserver: BreakpointObserver
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit()
    {
        this.store.pipe(select(fromSkin.findSkinById(1))).subscribe(result => {
            this.selectedSkin = result;
        });

        this.breakpointObserver
            .observe([Breakpoints.XSmall])
            .subscribe((state: BreakpointState) => {
                // Change type "sidenav" depending on the screen size
                (state.matches ? this.sidenavMode$ = of('over') : this.sidenavMode$ = of('side'));
                (state.matches ? this.sidenavOpen$ = of(false) : this.sidenavOpen$ = of(true));
            });
    }
}
