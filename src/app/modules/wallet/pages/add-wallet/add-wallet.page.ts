/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, OnInit} from "@angular/core";

// Providers
import { Logger } from "@providers/logger/logger";

@Component({
    selector: 'add-wallet-page',
    templateUrl: './add-wallet.page.html',
    styleUrls: ['./add-wallet.page.scss'],
})
export class AddWalletPage implements OnInit
{
    /**
     * Create a new AddWalletPage object
     *
     * @param {Logger} logger - Log provider
     */
    constructor(
        private logger: Logger
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.logger.info('Loaded: AddWalletPage');
    }
}
