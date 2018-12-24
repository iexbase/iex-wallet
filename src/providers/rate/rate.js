var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
import env from "../../environments";
// Providers
import { Logger } from '@providers/logger/logger';
var RateProvider = /** @class */ (function () {
    /**
     * Object creation RateProvider
     *
     * @param {HttpClient} http - Http Client Provider
     * @param {Logger} logger - Logger
     */
    function RateProvider(http, logger) {
        this.http = http;
        this.logger = logger;
        /**
         * Link to course file TRX
         *
         * @var string
         */
        this.rateServiceUrl = env.ratesAPI.trx;
        /**
         * Course loading status
         *
         * @var boolean
         */
        this.ratesTrxAvailable = false;
        /**
         * List of available alternative currencies
         *
         * @var RateInterface[]
         */
        this.alternatives = [
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
            { name: 'Bitcoin', isoCode: 'BTC', symbol: '₿' }
        ];
        this.logger.debug('RateProvider initialized');
        this.rates = {};
        this.SUN_TO_TRX = 1 / 1e6;
        this.TRX_TO_SUN = 1e6;
        this.updateRatesTrx().then(function () { });
    }
    /**
     * Update Course Data
     *
     * @return Promise
     */
    RateProvider.prototype.updateRatesTrx = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTrx()
                .then(function (dataTRX) {
                _this.rates = dataTRX;
                _.each(dataTRX, function (rate, code) {
                    _this.alternatives.map(function (maps) {
                        if (maps.isoCode === code) {
                            maps.rate = rate;
                        }
                    });
                });
                _this.ratesTrxAvailable = true;
                resolve();
            }).catch(function (errorTRX) {
                _this.logger.error(errorTRX);
                reject(errorTRX);
            });
        });
    };
    /**
     * Request for all courses
     *
     * @return Promise
     */
    RateProvider.prototype.getTrx = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.rateServiceUrl).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    /**
     * Request for all courses
     *
     * @return Promise
     */
    RateProvider.prototype.getRate = function (code) {
        return this.rates[code];
    };
    /**
     * An array of alternative courses
     *
     * @return RateInterface[]
     */
    RateProvider.prototype.getAlternatives = function () {
        return this.alternatives;
    };
    /**
     * Check for courses
     *
     * @return boolean
     */
    RateProvider.prototype.isTrxAvailable = function () {
        return this.ratesTrxAvailable;
    };
    /**
     * We convert to fiat
     *
     * @param sun - sun
     * @param code - code (fiat, crypto)
     * @return number
     */
    RateProvider.prototype.toFiat = function (sun, code) {
        if (!this.isTrxAvailable())
            return null;
        return sun * this.SUN_TO_TRX * this.getRate(code);
    };
    /**
     * From fiat to sun
     *
     * @param amount - amount
     * @param code - code (fiat, crypto)
     * @return number
     */
    RateProvider.prototype.fromFiat = function (amount, code) {
        if (!this.isTrxAvailable())
            return null;
        return (amount / this.getRate(code)) * this.TRX_TO_SUN;
    };
    /**
     * List of alternative currencies to sort
     *
     * @param sort - sorting
     * @return any[]
     */
    RateProvider.prototype.listAlternatives = function (sort) {
        var alternatives = _.map(this.getAlternatives(), function (item) {
            return {
                name: item.name,
                isoCode: item.isoCode,
                symbol: item.symbol
            };
        });
        if (sort) {
            alternatives.sort(function (a, b) {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });
        }
        return _.uniqBy(alternatives, 'isoCode');
    };
    /**
     * Forced course update
     *
     * @return Promise
     */
    RateProvider.prototype.whenRatesAvailable = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.ratesTrxAvailable) {
                resolve();
            }
            else {
                _this.updateRatesTrx().then(function () {
                    resolve();
                });
            }
        });
    };
    RateProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            Logger])
    ], RateProvider);
    return RateProvider;
}());
export { RateProvider };
//# sourceMappingURL=rate.js.map