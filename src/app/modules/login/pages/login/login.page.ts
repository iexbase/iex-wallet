/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { WalletProvider } from "@providers/wallet/wallet";
import {HttpClient} from "@angular/common/http";
import {AppProvider} from "@providers/app/app";
import {ElectronProvider} from "@providers/electron/electron";

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit
{
    /**
     * Update check
     *
     * @var boolean
     */
    isUpdate: boolean = false;

    /**
     * Create a new LoginPage object
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {HttpClient} httpClient - Perform HTTP requests.
     * @param {AppProvider} appProvider - Application provider
     * @param {ElectronProvider} electron - Electron provider
     */
    constructor(
        public walletProvider: WalletProvider,
        private httpClient: HttpClient,
        public appProvider: AppProvider,
        private electron: ElectronProvider
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
        this.httpClient.get('https://raw.githubusercontent.com/iexbase/iex-wallet/master/iex-wallet.json', {
        }).subscribe((resp: any) => {
            if(this.appProvider.info.version < resp.version)
                this.isUpdate = true
        });
    }

    /**
     * Link to GitHub to update the project
     *
     * @return void
     */
    onUpdate(): void {
        this.electron.openExternalLink(this.appProvider.info.gitReleases);
    }

    /**
     * Exit program
     *
     * @return void
     */
    quit(): void {
        this.electron.remote.app.quit();
    }
}
