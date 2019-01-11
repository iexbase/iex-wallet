/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { Logger } from "@providers/logger/logger";
import {Store} from "@ngrx/store";
import * as os from "os";

// redux
import {AppState} from "@redux/index";
import * as SkinActions from "@redux/skins/skins.actions";

// Providers
import { AppProvider } from "@providers/app/app";
import { ConfigProvider } from "@providers/config/config";

// As the handleOpenURL handler kicks in before the App is started,
// declare the handler function at the top of app.component.ts (outside the class definition)
// to track the passed Url
(window as any).handleOpenURL = (url: string) => {
    (window as any).handleOpenURL_LastURL = url;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    /**
     * Create a new AppComponent object
     *
     * @param {Store} store - Reactive provider
     * @param {ConfigProvider} config - ConfigProvider
     * @param {AppProvider} appProvider - App provider
     * @param {Logger} logger - Log provider
     */
    constructor(
        protected store: Store<AppState>,
        private config: ConfigProvider,
        private appProvider: AppProvider,
        private logger: Logger
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
        // The project is allowed to run only through "Electron"
        if (!AppComponent.isElectronPlatform())
            throw new Error('Web version is not available');

        this.onPlatformReady();
    }

    /**
     * We load providers
     */
    private onPlatformReady(): void
    {
        this.appProvider
            .load()
            .then(() => {
                this.onAppLoad();
            })
            .catch(err => {
                let message;
                try {
                    message = err instanceof Error ? err.toString() : JSON.stringify(err);
                } catch (error) {
                    message = 'Unknown error';
                }
                this.logger.error(message)
            });
    }

    /**
     * Write to the log details of the project
     */
    onAppLoad(): void
    {
        const deviceInfo = os.platform();

        this.logger.info(
            'Platform ready (' +
            deviceInfo +
            '): ' +
            this.appProvider.info.nameCase +
            ' - v' +
            this.appProvider.info.version
        );

        // Load the active skin
        this.store.dispatch(
            new SkinActions.AddSkin({
                skin: {
                    id: 1,
                    name: this.config.get('skins.name')
                }})
        );
    }

    /**
     * platform check on agent "electron"
     *
     * @returns {boolean | null}
     */
    private static isElectronPlatform(): boolean | null
    {
        const userAgent =
            navigator && navigator.userAgent
                ? navigator.userAgent.toLowerCase()
                : null;
        return userAgent && userAgent.indexOf(' electron/') > -1;
    }
}

