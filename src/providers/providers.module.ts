/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {NgModule} from "@angular/core";
import { DecimalPipe } from '@angular/common';

import {
    AddressBookProvider,
    AddressProvider,
    AppProvider,
    BackupProvider,
    ClipboardProvider,
    ConfigProvider,
    DomProvider,
    DownloadProvider,
    ElectronProvider,
    ExternalLinkProvider,
    FilterProvider,
    LanguageProvider,
    Logger,
    RateProvider,
    ReplaceParametersProvider,
    TimeProvider,
    TronProvider,
    VoteProvider,
    WalletProvider
} from "../providers";



@NgModule({
    providers: [
        AddressProvider,
        AppProvider,
        AddressBookProvider,
        BackupProvider,
        ClipboardProvider,
        ConfigProvider,
        DomProvider,
        DownloadProvider,
        ElectronProvider,
        ExternalLinkProvider,
        FilterProvider,
        LanguageProvider,
        Logger,
        RateProvider,
        ReplaceParametersProvider,
        TimeProvider,
        TronProvider,
        WalletProvider,
        VoteProvider,
        DecimalPipe
    ]
})
export class ProvidersModule {}
