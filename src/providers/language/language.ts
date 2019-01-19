/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as _ from 'lodash';
import * as moment from 'moment';

// Providers
import { ConfigProvider } from '@providers/config/config';
import { Logger } from '@providers/logger/logger';

// Interface
import {LanguageInterface} from './language.interface';


@Injectable()
export class LanguageProvider {
    /**
     * List of available languages
     *
     * @var array
     */
    private readonly languages: LanguageInterface[] = [
        {
            name: 'English',
            isoCode: 'en'
        }, {
            name: 'Pусский',
            isoCode: 'ru'
        }
    ];

    /**
     * Actual language
     *
     * @var string
     */
    private current: string;

    /**
     * Object creation LanguageProvider
     *
     * @param {Logger} logger - Logger
     * @param {TranslateService} translate - Translate Manager
     * @param {ConfigProvider} configProvider - Config Provider
     */
    constructor(
        private logger: Logger,
        private translate: TranslateService,
        private configProvider: ConfigProvider
    ) {
        this.logger.debug('LanguageProvider initialized');
        this.translate.onLangChange.subscribe(event => {
            this.logger.info('Setting new default language to: ' + event.lang);
        });
    }

    /**
     * Loading language
     *
     *  @return void
     */
    public load(): void {
        const lang = this.configProvider.get('wallet.settings.defaultLanguage');
        if (!_.isEmpty(lang)) {
            this.current = lang;
        } else {
            // Get from browser
            const browserLang = this.translate.getBrowserLang();
            this.current = this.getName(browserLang)
                ? browserLang : this.getDefault();
        }
        this.logger.info('Default language: ' + this.current);
        this.translate.setDefaultLang(this.current);
        moment.locale(this.current);
    }

    /**
     * Change language
     *
     * @param {string} lang - new lang
     * @return void
     */
    public set(lang: string): void {
        this.current = lang;
        this.translate.use(lang);
        moment.locale(lang);

        // write a new language
        this.configProvider.set(
            'wallet.settings.defaultLanguage',
            lang
        );
    }

    /**
     * Get the name of the language
     *
     * @param {string} lang - language iso code
     * @return string
     */
    public getName(lang: string): string {
        return _.result(
            _.find(this.languages, {
                isoCode: lang
            }),
            'name'
        );
    }

    /**
     * Get default language
     *
     * @return string
     */
    private getDefault(): string {
        return this.languages[0]['isoCode'];
    }

    /**
     * Get current language
     *
     * @return string
     */
    public getCurrent(): string {

        return this.current;
    }

    /**
     * Get list languages
     *
     * @return LanguageInterface[]
     */
    public getAvailables(): LanguageInterface[] {
        return this.languages;
    }
}
