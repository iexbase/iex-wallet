/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddWalletPage} from './pages/add-wallet/add-wallet.page';
import {WalletPage} from './pages/wallet/wallet.page';

const routes: Routes = [{
    path: '',
    component: WalletPage
}, {
    path: 'add-wallet',
    component: AddWalletPage
}, {
    path: ':wallet',
    component: WalletPage
}
];




@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class WalletRoutingModule { }
