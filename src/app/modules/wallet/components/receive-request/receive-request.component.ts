/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Input } from "@angular/core";

@Component({
    selector: 'receive-request',
    templateUrl: './receive-request.component.html',
    styleUrls: ['./receive-request.component.scss'],
})
export class ReceiveRequestComponent
{
    /**
     * Obtained parameters for generating generation QRCode
     *
     * @var any
     */
    @Input()
    params: any;

    /**
     * Create a new ReceiveRequestComponent object
     */
    constructor() {

    }
}
