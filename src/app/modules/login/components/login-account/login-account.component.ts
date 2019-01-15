/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component} from "@angular/core";
import {WalletProvider} from "@providers/wallet/wallet";
import {Router} from "@angular/router";
import {AppProvider} from "@providers/app/app";
import {Store} from "@ngrx/store";
import {AppState} from "@redux/index";
import * as WalletActions from "@redux/wallet/wallet.actions";

@Component({
    selector: 'login-account',
    templateUrl: './login-account.component.html',
    styleUrls: ['./login-account.component.scss']
})
export class LoginAccountComponent
{
    changeInputType: boolean = false;

    /**
     * Password (ngModel)
     *
     * @var string
     */
    password: string;

    /**
     * Password display status
     *
     * @var boolean
     */
    isVisibilityPassword: boolean = false;

    /**
     * Check the status of clicking on authorization buttons
     *
     * @var boolean
     */
    isSubmit: boolean = false;

    /**
     * In case of errors
     *
     * @var string
     */
    errorMessage: string;

    /**
     * Create a new LoginPage object
     *
     * @param {Store} store - Reactive service
     * @param {Router} router - Provides the navigation and url manipulation capabilities.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {AppProvider} appProvider - Application provider
     */
    constructor(
        protected store: Store<AppState>,
        private router: Router,
        public walletProvider: WalletProvider,
        public appProvider: AppProvider,
    ) {}

    /**
     * Password check in case of success go to the main account page
     *
     * @return void
     */
    goToLogin(): void
    {
        this.isSubmit = true;
        this.errorMessage = null;
        this.walletProvider.hasPassword(this.password)
            .then(password => {
                if(password.result == true) {
                    this.store.dispatch(
                        new WalletActions.AddWallets({
                            wallets: this.walletProvider.getWallets()
                        })
                    );
                    this.router.navigate(['/', 'dashboard'])
                }

            }).catch(err => {
            this.errorMessage = err;
        })
    }
}
