/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';

// Providers
import { WalletProvider } from '@providers/wallet/wallet';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    /**
     * Contains the information about a route associated with a component loaded in an
     * outlet at a particular moment in time. ActivatedRouteSnapshot can also be used to
     * traverse the router state tree.
     *
     * @var ActivatedRouteSnapshot
     */
    activatedRoute: ActivatedRouteSnapshot;

    /**
     * AuthGuardService
     *
     * The service checks if the user is authorized in the program.
     *
     * @param {Router} router - Provides the navigation and url manipulation capabilities.
     * @param {WalletProvider} walletProvider - Wallet provider
     */
    constructor(private router: Router,
                private walletProvider: WalletProvider) {
        // empty
    }

    /**
     * canActivate
     *
     * If all guards return true, navigation will continue.
     * If any guard returns false, navigation will be cancelled.
     *
     * @return Observable<boolean> | Promise<boolean> | boolean
     */
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.activatedRoute = route;

        // check if user wallet is present
        const isLoggedIn = (this.walletProvider.password != undefined);
        // logged in so return true
        if (isLoggedIn) { return true; }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url }
        }).then(() => {});
        return false;
    }
}
