/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    Component,
    OnInit,
    ViewChild
} from "@angular/core";
import { MatAccordion } from "@angular/material";
import { Store } from "@ngrx/store";
import * as SkinActions from "@redux/skins/skins.actions";
import { Update } from "@ngrx/entity";
import * as fromSkin from "@redux/skins/skins.reducer";

// Providers
import {ConfigProvider} from "@providers/config/config";


@Component({
    selector: 'skins',
    templateUrl: './skins.page.html',
    styleUrls: ['./skins.page.scss'],
})
export class SkinsPage implements OnInit
{
    @ViewChild('skinsaccordion') myPanels: MatAccordion;

    /**
     * List of available styles
     *
     * @return any[]
     */
    skins: any = [];

    /**
     * Selected style
     *
     * @return string
     */
    public selectedSkin: string;

    /**
     * Object creation SkinsPage
     *
     * @param {ConfigProvider} configProvider - Config provider
     * @param {Store} store - Reactive provider
     */
    constructor(
        private configProvider: ConfigProvider,
        protected store: Store<fromSkin.State>,
    ) {
        this.skins = [{
                name: "colors",
                themes: [
                    {'name': 'default', 'class': 'skin-default'},
                    {'name': 'barlow', 'class': 'skin-barlow'}
                ]
            }, {
                name: "textures",
                themes: [
                    {'name': 'Mosaic', 'class': 'skin-mosaic'},
                    {'name': 'Mamba', 'class': 'skin-mamba'},
                    {'name': 'Dadded', 'class': 'skin-padded'},
                    {'name': 'Wood', 'class': 'skin-wood'},
                    {'name': 'Argyle', 'class': 'skin-argyle'},
                    {'name': 'Jeans', 'class': 'skin-jeans'},
                    {'name': 'Diagmonds', 'class': 'skin-diagmonds'},
                    {'name': 'Woven', 'class': 'skin-woven'},
                    {'name': 'Dark Linen', 'class': 'skin-darklinen'}
                ]
            }
        ];
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.selectedSkin = this.configProvider.get('skins.name')
    }

    /**
     * Modify and save new style
     *
     * @param {string} name - Skin name
     * @return void
     */
    save(name: string)
    {
        this.configProvider.set('skins.name', name);
        this.selectedSkin = name;
        const update: Update<any> = {
            id: 1,
            changes: {
                name: name
            }
        };

        this.store.dispatch(
            new SkinActions.UpdateSkin({skin: update})
        )
    }

    /**
     * Status skins group
     *
     * @param {string} group - Skin group
     * @return boolean
     */
    expandedOpen(group: string): boolean {
        return this.configProvider.get('skins.settings.'+group) || false;
    }

    /**
     * Activity expansion panel
     *
     * @param {string} group - Skin type
     * @return boolean
     */
    openExpansion(group: string) {
        this.configProvider.set('skins.settings.'+group, true)
    }

    /**
     * Deactivate expansion panel
     *
     * @param {string} group - Skin group
     * @return boolean
     */
    closeExpansion(group: string) {
        this.configProvider.set('skins.settings.'+group, false)
    }
}
