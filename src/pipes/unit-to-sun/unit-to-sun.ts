/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unitToSun',
    pure: false
})
export class UnitToSunPipe implements PipeTransform
{
    constructor() {}

    transform(amount: number) {
        return amount * 1e6;
    }
}
