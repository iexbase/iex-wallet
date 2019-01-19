/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sunToUnit',
    pure: false
})
export class SunToUnitPipe implements PipeTransform {
    constructor(
        private decimalPipe: DecimalPipe) {
    }

    transform(amount: number, coin?: string) {

        if (!coin) {
            return this.decimalPipe.transform(amount / 1e6, '1.2-6');
        } else {
            if (coin.toUpperCase() == 'TRX') {
                return this.decimalPipe.transform(amount / 1e6, '1.2-6');
            } else {
                return amount;
            }
        }

    }
}
