/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Pipe, PipeTransform} from "@angular/core";

import {AddressProvider} from "@providers/address/address";

@Pipe({
    name: 'addressFromHex',
    pure: false
})
export class AddressFromHexPipe implements PipeTransform
{
    constructor(
        private addressProvider: AddressProvider,
    ) {

    }
    transform(address: string) {
        return this.addressProvider.toBase58(address)
    }
}
