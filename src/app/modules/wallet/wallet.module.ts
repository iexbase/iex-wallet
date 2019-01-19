/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {NgModule} from '@angular/core';
import {
    MatCheckboxModule,
    MatFormFieldModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
} from '@angular/material';
import {QRCodeModule} from 'angularx-qrcode';
import {LottieAnimationViewModule} from 'ng-lottie';
import {NgxMaskModule} from 'ngx-mask';

// Routers
import {WalletRoutingModule} from './wallet-routing.module';

// Pages
import {AddWalletPage} from './pages/add-wallet/add-wallet.page';
import {WalletPage} from './pages/wallet/wallet.page';

// Shared
import {SharedModule} from '@shared/shared.module';

// Components
import {WalletSettingsComponent} from '@modules/wallet/components/wallet-settings/wallet-settings.component';
import {ConfirmTxComponent} from './components/confirm-tx/confirm-tx.component';
import {CreateWalletComponent} from './components/create-wallet/create-wallet.component';
import {DeleteWalletComponent} from './components/delete-wallet/delete-wallet.component';
import {ExportWalletComponent} from './components/export-wallet/export-wallet.component';
import {FreezeBalanceComponent} from './components/freeze-balance/freeze-balance.component';
import {ImportMnemonicComponent} from './components/import-mnemonic/import-mnemonic.component';
import {ImportWalletComponent} from './components/import-wallet/import-wallet.component';
import {NoFundsTrxComponent} from './components/no-funds-trx/no-funds-trx.component';
import {PreferencesComponent} from './components/preferences/preferences.component';
import {ReceiveAccountComponent} from './components/receive-account/receive-account.component';
import {ReceiveRequestComponent} from './components/receive-request/receive-request.component';
import {SignedMessageComponent} from './components/signed-message/signed-message.component';
import {TransactionInfoComponent} from './components/transaction-info/transaction-info.component';
import {TransferAssetComponent} from './components/transfer-asset/transfer-asset.component';
import {VerifyMessageComponent} from './components/verify-message/verify-message.component';

const walletPage = [
    WalletPage,
    AddWalletPage
];

const walletComponent = [
    CreateWalletComponent,
    ImportWalletComponent,
    ImportMnemonicComponent,
    TransactionInfoComponent,
    NoFundsTrxComponent,
    ConfirmTxComponent,
    WalletSettingsComponent
];

const walletDirective = [

];

const walletDialog = [
    PreferencesComponent,
    ReceiveAccountComponent,
    ReceiveRequestComponent,
    TransferAssetComponent,
    FreezeBalanceComponent,
    DeleteWalletComponent,
    SignedMessageComponent,
    VerifyMessageComponent,
    ExportWalletComponent
];

const walletMaterial = [
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRadioModule
];

const walletModules = [
    SharedModule,
    NgxMaskModule.forRoot(),
    LottieAnimationViewModule.forRoot(),
    QRCodeModule,
    WalletRoutingModule
];

const walletPipes = [
    //
];


@NgModule({
    imports: [
        ...walletMaterial,
        ...walletModules
    ],
    declarations: [
        ...walletPage,
        ...walletComponent,
        ...walletDialog,
        ...walletPipes,
        ...walletDirective
    ],

    exports: [
        ...walletComponent,
        ...walletPage,
        ...walletMaterial,
        ...walletDialog,
        ...walletPipes
    ],

    entryComponents: [
        ...walletDialog
    ]
})
export class WalletModule { }
