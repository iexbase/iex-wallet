var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { LocalStorage } from "ngx-webstorage";
import * as _ from 'lodash';
// Providers
import { AppProvider } from '@providers/app/app';
import { ConfigProvider } from '@providers/config/config';
import { DownloadProvider } from '@providers/download/download';
import { Logger } from '@providers/logger/logger';
var SessionLogPage = /** @class */ (function () {
    /**
     * Object creation SessionLogPage
     *
     * @param {ConfigProvider} configProvider - Config provider
     * @param {Logger} logger - Log provider
     * @param {DownloadProvider} downloadProvider - Download Provider
     * @param {AppProvider} appProvider - App provider
     */
    function SessionLogPage(configProvider, logger, downloadProvider, appProvider) {
        this.configProvider = configProvider;
        this.logger = logger;
        this.downloadProvider = downloadProvider;
        this.appProvider = appProvider;
        // Active this page
        this.settingsView = 'session-log';
        var logLevels = this.logger.getLevels();
        this.logOptions = _.keyBy(logLevels, 'weight');
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    SessionLogPage.prototype.ngOnInit = function () {
        // Log level
        var selectedLevel = _.has(this.configProvider.getDefaults(), 'log.weight')
            ? this.logger.getWeight(this.configProvider.get('log.weight'))
            : this.logger.getDefaultWeight();
        this.filterValue = selectedLevel.weight;
        this.setOptionSelected(selectedLevel.weight);
        // Filtering by log level
        this.filterLogs(selectedLevel.weight);
    };
    /**
     * Filtering by log level
     *
     * @param {number} weight - Weight log
     * @return void
     */
    SessionLogPage.prototype.filterLogs = function (weight) {
        this.filteredLogs = _.sortBy(this.logger.get(weight), 'timestamp');
    };
    /**
     * Change log level
     *
     * @param {number} weight - Level
     * @return void
     */
    SessionLogPage.prototype.setOptionSelected = function (weight) {
        this.filterLogs(weight);
        this.configProvider.set('log.weight', weight);
    };
    /**
     * Preparing a log file for download
     *
     * @return string
     */
    SessionLogPage.prototype.prepareSessionLogs = function () {
        var _this = this;
        var log = this.appProvider.info.nameCase +
            ' Session Logs.\nBe careful, this could contain sensitive private data\n\n';
        log += '\n\n';
        Object.keys(this.filteredLogs).forEach(function (key) {
            log +=
                '[' +
                    _this.filteredLogs[key].timestamp +
                    '][' +
                    _this.filteredLogs[key].level +
                    ']' +
                    _this.filteredLogs[key].msg +
                    '\n';
        });
        return log;
    };
    /**
     * Request to download the log
     *
     * @return void
     */
    SessionLogPage.prototype.download = function () {
        var logs = this.prepareSessionLogs();
        var now = new Date().toISOString();
        var filename = this.appProvider.info.nameCase + '-logs-' + now + '.txt';
        this.downloadProvider.download(logs, filename).then(function () { });
    };
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], SessionLogPage.prototype, "settingsView", void 0);
    SessionLogPage = __decorate([
        Component({
            selector: 'session-log',
            templateUrl: './session-log.page.html',
            styleUrls: ['./session-log.page.scss'],
        }),
        __metadata("design:paramtypes", [ConfigProvider,
            Logger,
            DownloadProvider,
            AppProvider])
    ], SessionLogPage);
    return SessionLogPage;
}());
export { SessionLogPage };
//# sourceMappingURL=session-log.page.js.map