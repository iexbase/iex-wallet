/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

// Providers
import { AppProvider } from '@providers/app/app';
import { ConfigProvider } from '@providers/config/config';
import { DownloadProvider } from '@providers/download/download';
import { Logger } from '@providers/logger/logger';

@Component({
    selector: 'session-log',
    templateUrl: './session-log.page.html',
    styleUrls: ['./session-log.page.scss'],
})
export class SessionLogPage implements OnInit {
    /**
     * Available log types
     *
     * @var any[]
     */
    public logOptions;

    /**
     * Getting log
     *
     * @var any[]
     */
    public filteredLogs: any[];

    /**
     * Selected log type
     *
     * @var number
     */
    public filterValue: number;

    /**
     * Object creation SessionLogPage
     *
     * @param {ConfigProvider} configProvider - Config provider
     * @param {Logger} logger - Log provider
     * @param {DownloadProvider} downloadProvider - Download Provider
     * @param {AppProvider} appProvider - App provider
     */
    constructor(
        private configProvider: ConfigProvider,
        private logger: Logger,
        private downloadProvider: DownloadProvider,
        private appProvider: AppProvider
    ) {
        const logLevels = this.logger.getLevels();
        this.logOptions = _.keyBy(logLevels, 'weight');
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit(): void {
        // Log level
        const selectedLevel = _.has(this.configProvider.getDefaults(), 'log.weight')
            ? this.logger.getWeight(this.configProvider.get('log.weight'))
            : this.logger.getDefaultWeight();
        this.filterValue = selectedLevel.weight;
        this.setOptionSelected(selectedLevel.weight);
        // Filtering by log level
        this.filterLogs(selectedLevel.weight);
    }

    /**
     * Filtering by log level
     *
     * @param {number} weight - Weight log
     * @return void
     */
    private filterLogs(weight: number): void {
        this.filteredLogs = _.sortBy(this.logger.get(weight), 'timestamp');
    }

    /**
     * Change log level
     *
     * @param {number} weight - Level
     * @return void
     */
    public setOptionSelected(weight: number): void {
        this.filterLogs(weight);
        this.configProvider.set('log.weight', weight);
    }

    /**
     * Preparing a log file for download
     *
     * @return string
     */
    private prepareSessionLogs(): string {
        let log: string =
            this.appProvider.info.nameCase +
            ' Session Logs.\nBe careful, this could contain sensitive private data\n\n';
        log += '\n\n';

        Object.keys(this.filteredLogs).forEach(key => {
            log +=
                '[' +
                this.filteredLogs[key].timestamp +
                '][' +
                this.filteredLogs[key].level +
                ']' +
                this.filteredLogs[key].msg +
                '\n';
        });
        return log;
    }

    /**
     * Request to download the log
     *
     * @return void
     */
    public download(): void {
        const logs = this.prepareSessionLogs();
        const now = new Date().toISOString();
        const filename =  this.appProvider.info.nameCase + '-logs-' + now + '.txt';
        this.downloadProvider.download(logs, filename).then(() => {});
    }
}
