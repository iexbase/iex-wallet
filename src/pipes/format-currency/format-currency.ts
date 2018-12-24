/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {
    constructor(private decimalPipe: DecimalPipe) {}

    transform(amount: number, currencyCode: string, customPrecision?: number, hideCode?: boolean)
    {
        let precision =
            customPrecision || customPrecision === 0
                ? customPrecision : this.getPrecision(currencyCode);

        const numericValue = this.decimalPipe.transform(
            amount,
            this.getPrecisionString(precision)
        );

        return (hideCode == false) ? numericValue :
            currencyCode.toUpperCase() === 'USD' ?
                `$${numericValue}` : `${numericValue} ${currencyCode}`;
    }
    getPrecision(currencyCode: string) {
        return currencyCode.toUpperCase() === 'JPY' ? 0 : 2;
    }
    getPrecisionString(precision: number) {
        return `1.${precision}-${precision}`;
    }
}
