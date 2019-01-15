/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component} from "@angular/core";

// Providers
import { ElectronProvider } from "@providers/electron/electron";
import { AppProvider } from "@providers/app/app";

@Component({
    selector: 'help-page',
    templateUrl: './help.page.html',
    styleUrls: ['./help.page.scss'],
})
export class HelpPage
{
    /**
     * Create a new HelpPage object
     *
     * @param {ElectronProvider} electronProvider - Electron service
     * @param {AppProvider} app - Application provider
     */
    constructor (
        private electronProvider: ElectronProvider,
        public app: AppProvider
    ) {
        //
    }

    /**
     * Open link in browser
     *
     * @return boolean
     */
    openExternalLink(url: string): boolean {
        return this.electronProvider.openExternalLink(url)
    }
}
