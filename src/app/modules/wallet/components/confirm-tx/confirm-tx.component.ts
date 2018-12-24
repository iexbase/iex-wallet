/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Input } from "@angular/core";

// Providers
import { AddressProvider } from "@providers/address/address";

@Component({
    selector: 'confirm-tx',
    templateUrl: './confirm-tx.component.html',
    styleUrls: ['./confirm-tx.component.scss'],
})
export class ConfirmTxComponent
{
    /**
     * Transaction Details
     *
     * @var any
     */
    @Input() txp: any;

    /**
     *  Get a token
     *
     *  @var string
     */
    @Input()
    token: string;

    /**
     * Object creation ConfirmTxComponent
     *
     * @param {AddressProvider} addressProvider - Address provider
     */
    constructor(
        public addressProvider: AddressProvider
    ) {
        //
    }
}
