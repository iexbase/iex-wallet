/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NgModule } from '@angular/core';

// pipes
import { AddressFromHexPipe } from '@pipes/address-from-hex/address-from-hex';
import { FiatToUnitPipe } from '@pipes/fiat-to-unit/fiat-to-unit';
import { FormatAssetPipe } from '@pipes/format-asset/format-asset';
import { FormatCurrencyPipe } from '@pipes/format-currency/format-currency';
import { FromSunPipe } from '@pipes/from-sun/from-sun';
import { JsonIndentPipe } from '@pipes/json-indent/json-indent';
import { KeysPipe } from '@pipes/keys/keys';
import { OrderByPipe } from '@pipes/order-by/order-by';
import { SunToFiatPipe } from '@pipes/sun-to-fiat/sun-to-fiat';
import { SunToUnitPipe } from '@pipes/sun-to-unit/sun-to-unit';
import { ToSunPipe } from '@pipes/to-sun/to-sun';
import { UnitToSunPipe } from '@pipes/unit-to-sun/unit-to-sun';
import {UrlToTitlePipe} from '@pipes/url-to-title/url-to-title';

const commonPipes = [
    FormatCurrencyPipe,
    KeysPipe,
    OrderByPipe,
    SunToUnitPipe,
    UnitToSunPipe,
    SunToFiatPipe,
    FiatToUnitPipe,
    FormatAssetPipe,
    JsonIndentPipe,
    AddressFromHexPipe,
    FromSunPipe,
    ToSunPipe,
    UrlToTitlePipe
];

@NgModule({
    declarations: [
        ...commonPipes
    ],
    exports: [
        ...commonPipes
    ]
})
export class PipesModule {}
