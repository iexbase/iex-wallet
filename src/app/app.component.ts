/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { Logger } from "@providers/logger/logger";
import { Store } from "@ngrx/store";
import * as os from "os";

// redux
import {AppState} from "@redux/index";
import * as SkinActions from "@redux/skins/skins.actions";

// Providers
import { AppProvider } from "@providers/app/app";
import { ConfigProvider } from "@providers/config/config";
import {WalletProvider} from "@providers/wallet/wallet";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    constructor(
        protected store: Store<AppState>,
        public wallet: WalletProvider,
        private config: ConfigProvider,
        private appProvider: AppProvider,
        private logger: Logger
    ) {
        if (!AppComponent.isElectronPlatform())
            throw new Error('Web version is not available');
    }

    ngOnInit()
    {
        try {
            let osPlatform = os.platform();
            this.onPlatformReady(osPlatform);
        }catch (e) {
            this.logger.error('Platform is not ready.', e);
        }

        this.store.dispatch(
            new SkinActions.AddSkin({
                skin: {
                    id: 1,
                    name: this.config.get('skins.name')
                }})
        );
    }

    private onPlatformReady(readySource: any): void
    {
        this.appProvider
            .load()
            .then(() => {
                this.onAppLoad(readySource);
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

    onAppLoad(readySource: any) {
        this.logger.info(
            'Platform ready (' +
            readySource +
            '): ' +
            this.appProvider.info.nameCase +
            ' - v' +
            this.appProvider.info.version +
            ' (' + os.EOL + ')'
        );
    }

    private static isElectronPlatform(): boolean | null
    {
        const userAgent =
            navigator && navigator.userAgent
                ? navigator.userAgent.toLowerCase()
                : null;
        return userAgent && userAgent.indexOf(' electron/') > -1;
    }
}

