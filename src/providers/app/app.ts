/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@redux/index';

// Providers
import { ConfigProvider } from '@providers/config/config';
import { LanguageProvider } from '@providers/language/language';
import { Logger } from '@providers/logger/logger';


// Interface app config
interface App {
    packageName: string;
    packageDescription: string;
    appUri: string;
    name: string;
    nameCase: string;
    gitReleases: string;
    gitHubRepoUrl: string;
    gitHubRepoBugs: string;
    version: string;
}

@Injectable()
export class AppProvider {
    /**
     * We declare a variable with static parameters.
     *
     * @var App
     */
    public info: App = {
        packageName: null as string,
        packageDescription: null as string,
        appUri: null as string,
        name: null as string,
        nameCase: null as string,
        gitReleases: null as string,
        gitHubRepoUrl: null as string,
        gitHubRepoBugs: null as string,
        version: null as string,
    };

    /**
     * Project Baseline File
     *
     * @var string
     */
    private jsonPathApp = 'assets/appConfig.json';

    /**
     * Object creation AppProvider
     *
     * @param {Logger} logger - Log provider
     * @param {HttpClient} http - Perform HTTP requests.
     * @param {LanguageProvider} language - Language Provider
     * @param {Store} store - Reactive State
     * @param {ConfigProvider} config - Config Provider
     */
    constructor(
        private logger: Logger,
        private http: HttpClient,
        private language: LanguageProvider,
        protected store: Store<AppState>,
        protected config: ConfigProvider
    ) {
        this.logger.debug('AppProvider initialized');
    }

    /**
     * Asynchronous data loading
     *
     * @return Promise
     */
    public async load(): Promise<any> {
        await Promise.all([this.getInfo(), this.loadProviders()]);
    }

    /**
     * Asynchronous data writing to a variable
     *
     * @return Promise
     */
    private async getInfo(): Promise<any> {
        [this.info] = await Promise.all([
            this.getAppInfo()
        ]);
    }

    /**
     * Asynchronous loading of all providers
     *
     * @return Promise
     */
    private async loadProviders(): Promise<any> {
        await this.config.loadConfig();
        this.language.load();
    }

    /**
     * Get information from the base file
     *
     * @return Promise
     */
    private getAppInfo(): Promise<any> {
        return this.http.get(this.jsonPathApp).toPromise();
    }
}
