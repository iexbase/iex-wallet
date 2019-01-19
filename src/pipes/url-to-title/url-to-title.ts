/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'urlToTitle',
    pure: false
})
export class UrlToTitlePipe implements PipeTransform {
    constructor() {}

    transform(url: string) {
        let tempUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
        if (tempUrl.length > 35) {
            tempUrl = `${tempUrl.slice(0, 28)}...`;
        }
        return tempUrl;
    }
}
