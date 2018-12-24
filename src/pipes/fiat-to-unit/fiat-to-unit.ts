/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { RateProvider } from '@providers/rate/rate';

@Pipe({
    name: 'fiatToUnit',
    pure: false
})
export class FiatToUnitPipe implements PipeTransform
{

    constructor(
        private rateProvider: RateProvider,
        private decimalPipe: DecimalPipe
    ) {}
    transform(amount: number, coin: string, isDecimal: boolean = true)
    {
        if(coin.toUpperCase() == 'TRX') {
            return amount;
        }

        let amount_ = this.rateProvider.fromFiat(
            amount,
            coin.toUpperCase()
        );

        if(isDecimal == false) {
            return (amount_ / 1e6 || 0).toFixed(6);
        }

        return (
            this.decimalPipe.transform(amount_ / 1e6 || 0, '1.2-6')
        );
    }
}
