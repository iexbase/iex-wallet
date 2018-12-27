/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {NgModule} from "@angular/core";
import { DecimalPipe } from '@angular/common';

import {
    AddressProvider,
    AppProvider,
    BackupProvider, ClipboardProvider,
    ConfigProvider,
    DomProvider,
    DownloadProvider,
    ElectronProvider,
    FilterProvider,
    LanguageProvider,
    Logger,
    RateProvider,
    ReplaceParametersProvider,
    TimeProvider,
    TronProvider,
    WalletProvider
} from "../providers";



@NgModule({
    providers: [
        AddressProvider,
        AppProvider,
        BackupProvider,
        ClipboardProvider,
        ConfigProvider,
        DomProvider,
        DownloadProvider,
        ElectronProvider,
        FilterProvider,
        LanguageProvider,
        Logger,
        RateProvider,
        ReplaceParametersProvider,
        TimeProvider,
        TronProvider,
        WalletProvider,
        DecimalPipe
    ]
})
export class ProvidersModule {}
