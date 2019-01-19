/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

// Providers
import {Logger} from '@providers/logger/logger';

@Injectable()
export class DownloadProvider {
    /**
     * Object creation DownloadProvider
     *
     * @param logger - Logger
     */
    constructor(private logger: Logger) {
        this.logger.debug('DownloadProvider initialized');
    }

    public download(ew, fileName: string): Promise<any> {
        return new Promise(async resolve => {
            await timer(1000).toPromise();
            const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
            const blob = this.newBlob(ew, 'text/plain;charset=utf-8');
            const url = window.URL.createObjectURL(blob);

            document.body.appendChild(a);

            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);

            return resolve();
        });
    }

    public newBlob(data, datatype: string) {
        let out;
        try {
            this.logger.debug('Trying to blob data');
            out = new Blob([data], {
                type: datatype
            });
        } catch (e) {
            if (e.name == 'InvalidStateError') {
                // InvalidStateError (tested on FF13 WinXP)
                this.logger.debug('Invalid state Error: Trying to blob data again');
                out = new Blob([data], {
                    type: datatype
                });
            } else {
                // We're screwed, blob constructor unsupported entirely
                this.logger.error('Error: blob constructor unsupported entirely');
            }
        }
        return out;
    }
}
