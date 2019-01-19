/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {LocalStorage} from 'ngx-webstorage';

// Providers
import { ConfigProvider } from '@providers/config/config';
import { Logger } from '@providers/logger/logger';
import { RateProvider } from '@providers/rate/rate';

@Component({
    selector: 'alt-currency',
    templateUrl: './alt-currency.page.html',
    styleUrls: ['./alt-currency.page.scss'],
})
export class AltCurrencyPage implements OnInit {
    /**
     * Frequently used alternative currencies
     *
     * @var any
     */
    @LocalStorage()
    lastUsedAltCurrency: any;

    /**
     * Full list of alternative currencies
     *
     * @var any[]
     */
    public completeAlternativeList = [];

    /**
     * Alt currency list
     *
     * @var any[]
     */
    public altCurrencyList = [];

    /**
     * Selected currency
     *
     * @var string
     */
    public currentCurrency: string;

    /**
     * Search text
     *
     * @var string
     */
    public searchedAltCurrency: string;

    /**
     * Unused currency
     *
     * @var any[]
     */
    private unusedCurrencyList;

    /**
     * Recently used alternative currencies
     *
     * @var []
     */
    public lastUsedAltCurrencyList;

    /**
     * Object creation AltCurrencyPage
     *
     * @param {ConfigProvider} configProvider - Config provider
     * @param {RateProvider} rate - Rate provider
     * @param {Logger} logger - Logger provider
     */
    constructor(
        private configProvider: ConfigProvider,
        private rate: RateProvider,
        private logger: Logger
    ) {
        this.completeAlternativeList = [];
        this.altCurrencyList = [];
        this.unusedCurrencyList = [];
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        // Get all available currencies
        this.rate
            .whenRatesAvailable()
            .then(() => {
                this.completeAlternativeList = this.rate.listAlternatives(true);
                const idx = _.keyBy(this.unusedCurrencyList, 'isoCode');
                const idx2 = _.keyBy(this.lastUsedAltCurrencyList, 'isoCode');

                this.completeAlternativeList = _.reject(
                    this.completeAlternativeList,
                    c => {
                        return idx[c.isoCode] || idx2[c.isoCode];
                    }
                );
                this.altCurrencyList = this.completeAlternativeList.slice(0, 20);
            })
            .catch(err => {
                this.logger.error(err);
            });

        // Sort currencies
        this.altCurrencyList = this.rate.listAlternatives(true);
        this.currentCurrency = this.configProvider.get('wallet.settings.alternativeIsoCode').toUpperCase();
        this.lastUsedAltCurrencyList = this.lastUsedAltCurrency
            ? JSON.parse(this.lastUsedAltCurrency)
            : [];

    }

    /**
     * Change of the main alternative currency
     *
     * @param {any} newAltCurrency - New currency options
     * @return void
     */
    onChangeCurrency(newAltCurrency: any): void {
        this.configProvider.set('wallet.settings.alternativeName', newAltCurrency.name);
        this.configProvider.set('wallet.settings.alternativeIsoCode', newAltCurrency.isoCode);
        this.saveLastUsed(newAltCurrency);
    }

    /**
     * We also write to the list of frequently used currencies.
     *
     * @param {any} newAltCurrency - New currency options
     * @return void
     */
    private saveLastUsed(newAltCurrency): void {
        this.lastUsedAltCurrencyList.unshift(newAltCurrency);
        this.lastUsedAltCurrencyList = _.uniqBy(
            this.lastUsedAltCurrencyList,
            'isoCode'
        );
        this.lastUsedAltCurrencyList = this.lastUsedAltCurrencyList.slice(0, 3);
        this.lastUsedAltCurrency = JSON.stringify(this.lastUsedAltCurrencyList);
    }

    /**
     * Currency search
     *
     * @param {string} searchedAltCurrency - Search text
     * @return void
     */
    public findCurrency(searchedAltCurrency: string): void {
        this.altCurrencyList = _.filter(this.completeAlternativeList, item => {
            const val = item.name;
            const val2 = item.symbol;
            return (
                _.includes(val.toLowerCase(), searchedAltCurrency.toLowerCase()) ||
                _.includes(val2.toLowerCase(), searchedAltCurrency.toLowerCase())
            );
        });
    }

    /**
     * Clearing the search field
     *
     * @return void
     */
    clearSearch(): void {
        this.findCurrency('');
        this.searchedAltCurrency = '';
    }
}
