/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'jsonIndent'
})
export class JsonIndentPipe implements PipeTransform {
    transform(val: any) {
        return JSON.stringify(val, null, 0);
    }
}
