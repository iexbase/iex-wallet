/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';

import env from "../../environments";

// Providers
import { Logger } from '@providers/logger/logger';

// Interface rates
export interface RateInterface {
    name: string;
    isoCode: string;
    symbol: string;
    rate?: number;
}

@Injectable()
export class RateProvider
{
    /**
     * Array where the list of courses received is stored
     *
     * @var any
     */
    protected rates: any;

    /**
     * Convert a value in SUN to TRX. (1 SUN = 0.000001 TRX)
     *
     * @var number
     */
    protected SUN_TO_TRX: number;

    /**
     *  Convert a value in TRX to SUN. (1 SUN = 0.000001 TRX)
     *
     *  @var number
     */
    protected TRX_TO_SUN: number;

    /**
     * Link to course file TRX
     *
     * @var string
     */
    private rateServiceUrl = env.ratesAPI.trx;

    /**
     * Course loading status
     *
     * @var boolean
     */
    private ratesTrxAvailable: boolean = false;

    /**
     * List of available alternative currencies
     *
     * @var RateInterface[]
     */
    private alternatives: RateInterface[] = [
        { name: 'US Dollar', isoCode: 'USD', symbol: '$' },
        { name: 'Euro', isoCode: 'EUR', symbol: '€' },
        { name: 'Russian Ruble', isoCode: 'RUB', symbol: '₽' },
        { name: 'Japanese Yen', isoCode: 'JPY', symbol: '¥' },
        { name: 'British pound', isoCode: 'GBP', symbol: '£' },
        { name: 'Australian dollar', isoCode: 'AUD', symbol: '$' },
        { name: 'Canadian dollar', isoCode: 'CAD', symbol: '$' },
        { name: 'Indonesian rupiah', isoCode: 'IDR', symbol: 'Rp' },
        { name: 'Indian rupee', isoCode: 'INR', symbol: '₹' },
        { name: 'South Korean won', isoCode: 'KRW', symbol: '₩' },
        { name: 'Mexican peso', isoCode: 'MXN', symbol: '$' },
        { name: 'New Zealand dollar', isoCode: 'NZD', symbol: '$' },
        { name: 'Polish złoty', isoCode: 'PLN', symbol: 'zł' },
        { name: 'Turkish lira', isoCode: 'TRY', symbol: '₺' },
        { name: 'Bitcoin', isoCode: 'BTC', symbol: '₿' },
        { name: 'Uzbekistan Som', isoCode: 'UZS', symbol: 'лв'},
        { name: 'Ukrainian Hryvnia', isoCode: 'UAH', symbol: '₴'},
        { name: 'New Taiwan Dollar', isoCode: 'TWD', symbol: 'NT$'},
        { name: 'Circle USD Coin', isoCode: 'USDC', symbol: '$'},
        { name: 'Argentine Peso', isoCode: 'ARS', symbol: '$'}
    ];

    /**
     * Object creation RateProvider
     *
     * @param {HttpClient} http - Http Client Provider
     * @param {Logger} logger - Logger
     */
    constructor(
        private http: HttpClient,
        private logger: Logger
    ) {
        this.logger.debug('RateProvider initialized');
        this.rates = {};
        this.SUN_TO_TRX = 1 / 1e6;
        this.TRX_TO_SUN = 1e6;
        this.updateRatesTrx().then(() => {});
    }

    /**
     * Update Course Data
     *
     * @return Promise
     */
    public updateRatesTrx(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.getTrx()
                .then(dataTRX => {
                    this.rates = dataTRX;
                    _.each(dataTRX, (rate, code) => {
                        this.alternatives.map((maps) => {
                            if(maps.isoCode === code) {
                                maps.rate = rate
                            }
                        })
                    });

                    this.ratesTrxAvailable = true;
                    resolve();
                }).catch(errorTRX => {
                    this.logger.error(errorTRX);
                    reject(errorTRX);
            });
        })
    }

    /**
     * Request for all courses
     *
     * @return Promise
     */
    public getTrx(): Promise<any>  {
        return new Promise(resolve => {
            this.http.get(this.rateServiceUrl).subscribe(data => {
                resolve(data);
            });
        });
    }

    /**
     * Request for all courses
     *
     * @return Promise
     */
    public getRate(code: string): number {
        return this.rates[code];
    }

    /**
     * An array of alternative courses
     *
     * @return RateInterface[]
     */
    public getAlternatives(): RateInterface[] {
        return this.alternatives;
    }

    /**
     * Check for courses
     *
     * @return boolean
     */
    public isTrxAvailable(): boolean {
        return this.ratesTrxAvailable;
    }

    /**
     * We convert to fiat
     *
     * @param sun - sun
     * @param code - code (fiat, crypto)
     * @return number
     */
    public toFiat(sun: number, code: string): number {
        if (!this.isTrxAvailable()) return null;
        return sun * this.SUN_TO_TRX * this.getRate(code);
    }

    /**
     * From fiat to sun
     *
     * @param amount - amount
     * @param code - code (fiat, crypto)
     * @return number
     */
    public fromFiat(amount: number, code: string): number {
        if (!this.isTrxAvailable()) return null;
        return (amount / this.getRate(code)) * this.TRX_TO_SUN;
    }

    /**
     * List of alternative currencies to sort
     *
     * @param sort - sorting
     * @return any[]
     */
    public listAlternatives(sort: boolean): any[]
    {
        let alternatives = _.map(this.getAlternatives(), (item: any) => {
            return {
                name: item.name,
                isoCode: item.isoCode,
                symbol: item.symbol
            };
        });

        if (sort) {
            alternatives.sort((a, b) => {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });
        }
        return _.uniqBy(alternatives, 'isoCode');
    }

    /**
     * Forced course update
     *
     * @return Promise
     */
    public whenRatesAvailable(): Promise<any>
    {
        return new Promise(resolve => {
            if(this.ratesTrxAvailable) {
                resolve();
            } else {
                this.updateRatesTrx().then(() => {
                    resolve();
                });
            }
        });
    }
}
