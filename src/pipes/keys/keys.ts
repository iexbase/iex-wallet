/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {
    /*
     * Example use
     *  Simple: *ngFor="let item of giftCards | keys"
     *	With an object with objects: *ngFor="let item of (itemsObject | keys : 'date') | orderBy : ['-order']"
     */
    transform(value, orderBy?: string) {
        const keys = [];
        for (const key in value) {
            keys.push({
                key,
                value: value[key],
                order: orderBy ? value[key][orderBy] : null
            });
        }
        return keys;
    }
}

