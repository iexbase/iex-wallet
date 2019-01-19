/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

/*
 * Example of use:
 * let message = this.replaceParametersProvider.replace(this.translate.instant('A total of {{amountBelowFeeStr}} {{coin}} were excluded.
 * These funds come from UTXOs smaller than the network fee provided.'), { amountBelowFeeStr: amountBelowFeeStr, coin: this.tx.coin.toUpperCase() });
 */

@Injectable()
export class ReplaceParametersProvider {
    /**
     * Object creation ReplaceParametersProvider
     */
    constructor() {

    }

    public replace(stringToReplace: string, params: any[]): string {
        const processedParams = [];
        for (const key in params) {
            processedParams.push({ key, value: params[key] });
        }

        processedParams.forEach(param => {
            stringToReplace = _.replace(
                stringToReplace,
                new RegExp('{{' + param.key + '}}', 'g'),
                param.value
            );
            stringToReplace = _.replace(
                stringToReplace,
                new RegExp('{{ ' + param.key + ' }}', 'g'),
                param.value
            );
        });
        return stringToReplace;
    }
}
