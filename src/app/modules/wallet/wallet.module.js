var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from "@shared/shared.module";
import { MatCheckboxModule, MatFormFieldModule, MatMenuModule, MatRadioModule, MatSelectModule, MatSnackBarModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { AddWalletPage } from "./pages/add-wallet/add-wallet.page";
import { WalletRoutingModule } from "./wallet-routing.module";
import { WalletPage } from "./pages/wallet/wallet.page";
import { LottieAnimationViewModule } from "ng-lottie";
import { NgxMaskModule } from "ngx-mask";
import { QRCodeModule } from "angularx-qrcode";
import { ImportMnemonicComponent } from "@modules/wallet/components/import-mnemonic/import-mnemonic.component";
import { CreateWalletComponent } from "@modules/wallet/components/create-wallet/create-wallet.component";
import { ImportWalletComponent } from "@modules/wallet/components/import-wallet/import-wallet.component";
import { PreferencesComponent } from "@modules/wallet/components/preferences/preferences.component";
import { ReceiveAccountComponent } from "@modules/wallet/components/receive-account/receive-account.component";
import { ReceiveRequestComponent } from "@modules/wallet/components/receive-request/receive-request.component";
import { TransferAssetComponent } from "@modules/wallet/components/transfer-asset/transfer-asset.component";
import { ExportWalletComponent } from "@modules/wallet/components/export-wallet/export-wallet.component";
import { FreezeBalanceComponent } from "@modules/wallet/components/freeze-balance/freeze-balance.component";
import { DeleteWalletComponent } from "@modules/wallet/components/delete-wallet/delete-wallet.component";
import { SignedMessageComponent } from "@modules/wallet/components/signed-message/signed-message.component";
import { VerifyMessageComponent } from "@modules/wallet/components/verify-message/verify-message.component";
import { TransactionInfoComponent } from "@modules/wallet/components/transaction-info/transaction-info.component";
import { NoFundsTrxComponent } from "@modules/wallet/components/no-funds-trx/no-funds-trx.component";
import { ConfirmTxComponent } from "@modules/wallet/components/confirm-tx/confirm-tx.component";
var walletPage = [
    WalletPage,
    AddWalletPage
];
var walletComponent = [
    CreateWalletComponent,
    ImportWalletComponent,
    ImportMnemonicComponent,
    TransactionInfoComponent,
    NoFundsTrxComponent,
    ConfirmTxComponent,
];
var walletDirective = [];
var walletDialog = [
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
var walletMaterial = [
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRadioModule
];
var walletModules = [
    SharedModule,
    NgxMaskModule.forRoot(),
    LottieAnimationViewModule.forRoot(),
    QRCodeModule,
    WalletRoutingModule
];
var walletPipes = [
//
];
var WalletModule = /** @class */ (function () {
    function WalletModule() {
    }
    WalletModule = __decorate([
        NgModule({
            imports: walletMaterial.concat(walletModules),
            declarations: walletPage.concat(walletComponent, walletDialog, walletPipes, walletDirective),
            exports: walletComponent.concat(walletPage, walletMaterial, walletDialog, walletPipes),
            entryComponents: walletDialog.slice()
        })
    ], WalletModule);
    return WalletModule;
}());
export { WalletModule };
//# sourceMappingURL=wallet.module.js.map