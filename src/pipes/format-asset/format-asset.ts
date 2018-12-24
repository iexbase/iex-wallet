/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {Base64} from "js-base64";

@Pipe({
    name: 'formatAsset',
    pure: false
})
export class FormatAssetPipe implements PipeTransform {
    constructor() {}

    transform(asset?: string) {
        return (asset == undefined ? 'TRX' : Base64.decode(asset));
    }
}
