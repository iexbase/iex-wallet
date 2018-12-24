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
import { ConfigProvider } from '@providers/config/config';
import { RateProvider } from '@providers/rate/rate';
import { Logger } from "@providers/logger/logger";
var AltCurrencyPage = /** @class */ (function () {
    /**
     * Object creation AltCurrencyPage
     *
     * @param {ConfigProvider} configProvider - Config provider
     * @param {RateProvider} rate - Rate provider
     * @param {Logger} logger - Logger provider
     */
    function AltCurrencyPage(configProvider, rate, logger) {
        this.configProvider = configProvider;
        this.rate = rate;
        this.logger = logger;
        /**
         * Full list of alternative currencies
         *
         * @var any[]
         */
        this.completeAlternativeList = [];
        /**
         * Alt currency list
         *
         * @var any[]
         */
        this.altCurrencyList = [];
        // Activate this page
        this.settingsView = 'alt-currency';
        this.completeAlternativeList = [];
        this.altCurrencyList = [];
        this.unusedCurrencyList = [];
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    AltCurrencyPage.prototype.ngOnInit = function () {
        var _this = this;
        // Get all available currencies
        this.rate
            .whenRatesAvailable()
            .then(function () {
            _this.completeAlternativeList = _this.rate.listAlternatives(true);
            var idx = _.keyBy(_this.unusedCurrencyList, 'isoCode');
            var idx2 = _.keyBy(_this.lastUsedAltCurrencyList, 'isoCode');
            _this.completeAlternativeList = _.reject(_this.completeAlternativeList, function (c) {
                return idx[c.isoCode] || idx2[c.isoCode];
            });
            _this.altCurrencyList = _this.completeAlternativeList.slice(0, 20);
        })
            .catch(function (err) {
            _this.logger.error(err);
        });
        // Sort currencies
        this.altCurrencyList = this.rate.listAlternatives(true);
        this.currentCurrency = this.configProvider.get('wallet.settings.alternativeIsoCode').toLowerCase();
        this.lastUsedAltCurrencyList = this.lastUsedAltCurrency
            ? JSON.parse(this.lastUsedAltCurrency)
            : [];
    };
    /**
     * Change of the main alternative currency
     *
     * @param {any} newAltCurrency - New currency options
     * @return void
     */
    AltCurrencyPage.prototype.onChangeCurrency = function (newAltCurrency) {
        this.configProvider.set('wallet.settings.alternativeName', newAltCurrency.name);
        this.configProvider.set('wallet.settings.alternativeIsoCode', newAltCurrency.isoCode);
        this.saveLastUsed(newAltCurrency);
    };
    /**
     * We also write to the list of frequently used currencies.
     *
     * @param {any} newAltCurrency - New currency options
     * @return void
     */
    AltCurrencyPage.prototype.saveLastUsed = function (newAltCurrency) {
        this.lastUsedAltCurrencyList.unshift(newAltCurrency);
        this.lastUsedAltCurrencyList = _.uniqBy(this.lastUsedAltCurrencyList, 'isoCode');
        this.lastUsedAltCurrencyList = this.lastUsedAltCurrencyList.slice(0, 3);
        this.lastUsedAltCurrency = JSON.stringify(this.lastUsedAltCurrencyList);
    };
    /**
     * Currency search
     *
     * @param {string} searchedAltCurrency - Search text
     * @return void
     */
    AltCurrencyPage.prototype.findCurrency = function (searchedAltCurrency) {
        this.altCurrencyList = _.filter(this.completeAlternativeList, function (item) {
            var val = item.name;
            var val2 = item.symbol;
            return (_.includes(val.toLowerCase(), searchedAltCurrency.toLowerCase()) ||
                _.includes(val2.toLowerCase(), searchedAltCurrency.toLowerCase()));
        });
    };
    /**
     * Clearing the search field
     *
     * @return void
     */
    AltCurrencyPage.prototype.clearSearch = function () {
        this.findCurrency('');
        this.searchedAltCurrency = '';
    };
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], AltCurrencyPage.prototype, "settingsView", void 0);
    __decorate([
        LocalStorage(),
        __metadata("design:type", Object)
    ], AltCurrencyPage.prototype, "lastUsedAltCurrency", void 0);
    AltCurrencyPage = __decorate([
        Component({
            selector: 'alt-currency',
            templateUrl: './alt-currency.page.html',
            styleUrls: ['./alt-currency.page.scss'],
        }),
        __metadata("design:paramtypes", [ConfigProvider,
            RateProvider,
            Logger])
    ], AltCurrencyPage);
    return AltCurrencyPage;
}());
export { AltCurrencyPage };
//# sourceMappingURL=alt-currency.page.js.map