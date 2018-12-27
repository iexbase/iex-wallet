/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pipe, PipeTransform } from '@angular/core';
import {TronProvider} from "@providers/tron/tron";

@Pipe({
    name: 'toSun',
    pure: false
})
export class ToSunPipe implements PipeTransform
{
    /**
     * Create a new toSunPipe object
     *
     * @param {TronProvider} tron - Tron provider
     */
    constructor(
        private tron: TronProvider
    ) {
        //
    }

    transform(amount: number) {
        return this.tron.toSun(amount);
    }
}
