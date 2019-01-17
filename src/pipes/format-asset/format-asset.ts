/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {TronProvider} from "@providers/tron/tron";

@Pipe({
    name: 'formatAsset',
    pure: false
})
export class FormatAssetPipe implements PipeTransform {
    constructor(
        private tron: TronProvider
    ) {}

    transform(key?: string) {
        let filter = this.tron.getListTokens().filter(c =>
            c.id == key
        ) || [];

        if (filter.length > 0)
            return (key == '0' ? 'TRX' : filter[ 0 ].name);
        return 'NaN';
    }
}
