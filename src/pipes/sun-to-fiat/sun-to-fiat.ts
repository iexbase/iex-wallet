/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Pipe, PipeTransform} from '@angular/core';

import {ConfigProvider} from '@providers/config/config';
import {RateProvider} from '@providers/rate/rate';

import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';

@Pipe({
    name: 'sunToFiat',
    pure: false
})
export class SunToFiatPipe implements PipeTransform {
    private unit;

    rates: Observable<any[]>;

    constructor(
        private configProvider: ConfigProvider,
        private rateProvider: RateProvider,
        private decimalPipe: DecimalPipe
    ) {
        // this.configProvider.loadConfig();
        this.unit = this.configProvider.get('wallet.settings.alternativeIsoCode');
    }
    transform(amount: number, isoCode: boolean = false) {
        const amount_ = this.rateProvider.toFiat(amount, this.unit);
        return (
            this.decimalPipe.transform(amount_ || 0,
                (this.unit == 'BTC') ? '1.8-8' : '1.2-2'
            ) + (isoCode == true ? ' ' + this.unit.toUpperCase() : '')
        );
    }
}
