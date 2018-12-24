/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {SharedModule} from "@shared/shared.module";
import {
    MatCheckboxModule,
    MatFormFieldModule, MatMenuModule, MatRadioModule,
    MatSelectModule,
    MatSnackBarModule
} from "@angular/material";
import {NgModule} from "@angular/core";
import {AddWalletPage} from "./pages/add-wallet/add-wallet.page";
import {WalletRoutingModule} from "./wallet-routing.module";
import {WalletPage} from "./pages/wallet/wallet.page";
import {LottieAnimationViewModule} from "ng-lottie";


import {NgxMaskModule} from "ngx-mask";
import {QRCodeModule} from "angularx-qrcode";
import {ImportMnemonicComponent} from "@modules/wallet/components/import-mnemonic/import-mnemonic.component";
import {CreateWalletComponent} from "@modules/wallet/components/create-wallet/create-wallet.component";
import {ImportWalletComponent} from "@modules/wallet/components/import-wallet/import-wallet.component";
import {PreferencesComponent} from "@modules/wallet/components/preferences/preferences.component";
import {ReceiveAccountComponent} from "@modules/wallet/components/receive-account/receive-account.component";
import {ReceiveRequestComponent} from "@modules/wallet/components/receive-request/receive-request.component";
import {TransferAssetComponent} from "@modules/wallet/components/transfer-asset/transfer-asset.component";
import {ExportWalletComponent} from "@modules/wallet/components/export-wallet/export-wallet.component";
import {FreezeBalanceComponent} from "@modules/wallet/components/freeze-balance/freeze-balance.component";
import {DeleteWalletComponent} from "@modules/wallet/components/delete-wallet/delete-wallet.component";
import {SignedMessageComponent} from "@modules/wallet/components/signed-message/signed-message.component";
import {VerifyMessageComponent} from "@modules/wallet/components/verify-message/verify-message.component";
import {TransactionInfoComponent} from "@modules/wallet/components/transaction-info/transaction-info.component";
import {NoFundsTrxComponent} from "@modules/wallet/components/no-funds-trx/no-funds-trx.component";
import {ConfirmTxComponent} from "@modules/wallet/components/confirm-tx/confirm-tx.component";
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
