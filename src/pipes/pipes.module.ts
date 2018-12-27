/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NgModule } from "@angular/core";

// pipes
import { FormatCurrencyPipe } from "@pipes/format-currency/format-currency";
import { KeysPipe } from "@pipes/keys/keys";
import { OrderByPipe } from "@pipes/order-by/order-by";
import { SunToUnitPipe } from "@pipes/sun-to-unit/sun-to-unit";
import { UnitToSunPipe } from "@pipes/unit-to-sun/unit-to-sun";
import {SunToFiatPipe} from "@pipes/sun-to-fiat/sun-to-fiat";
import {FormatAssetPipe} from "@pipes/format-asset/format-asset";
import {FiatToUnitPipe} from "@pipes/fiat-to-unit/fiat-to-unit";
import {JsonIndentPipe} from "@pipes/json-indent/json-indent";
import {AddressFromHexPipe} from "@pipes/address-from-hex/address-from-hex";

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
    AddressFromHexPipe
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
