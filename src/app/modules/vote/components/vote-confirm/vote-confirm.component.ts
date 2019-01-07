/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Input } from "@angular/core";

@Component({
    selector: 'vote-confirm',
    templateUrl: './vote-confirm.component.html',
    styleUrls: ['./vote-confirm.component.scss'],
})
export class VoteConfirmComponent
{
    /**
     * Transaction Details
     *
     * @var any
     */
    @Input() txp: any;

    /**
     * Object creation VoteConfirmComponent
     */
    constructor() {
        //
    }
}
