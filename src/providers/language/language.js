var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import * as moment from 'moment';
// Providers
import { Logger } from '@providers/logger/logger';
import { ConfigProvider } from '@providers/config/config';
var LanguageProvider = /** @class */ (function () {
    /**
     * Object creation LanguageProvider
     *
     * @param {Logger} logger - Logger
     * @param {TranslateService} translate - Translate Manager
     * @param {ConfigProvider} configProvider - Config Provider
     */
    function LanguageProvider(logger, translate, configProvider) {
        var _this = this;
        this.logger = logger;
        this.translate = translate;
        this.configProvider = configProvider;
        /**
         * List of available languages
         *
         * @var array
         */
        this.languages = [
            {
                name: 'English',
                isoCode: 'en'
            }, {
                name: 'Pусский',
                isoCode: 'ru'
            }
        ];
        this.logger.debug('LanguageProvider initialized');
        this.translate.onLangChange.subscribe(function (event) {
            _this.logger.info('Setting new default language to: ' + event.lang);
        });
    }
    /**
     * Loading language
     *
     *  @return void
     */
    LanguageProvider.prototype.load = function () {
        var lang = this.configProvider.get('wallet.settings.defaultLanguage');
        if (!_.isEmpty(lang)) {
            this.current = lang;
        }
        else {
            // Get from browser
            var browserLang = this.translate.getBrowserLang();
            this.current = this.getName(browserLang)
                ? browserLang : this.getDefault();
        }
        this.logger.info('Default language: ' + this.current);
        this.translate.setDefaultLang(this.current);
        moment.locale(this.current);
    };
    /**
     * Change language
     *
     * @param {string} lang - new lang
     * @return void
     */
    LanguageProvider.prototype.set = function (lang) {
        this.current = lang;
        this.translate.use(lang);
        moment.locale(lang);
        // write a new language
        this.configProvider.set('wallet.settings.defaultLanguage', lang);
    };
    /**
     * Get the name of the language
     *
     * @param {string} lang - language iso code
     * @return string
     */
    LanguageProvider.prototype.getName = function (lang) {
        return _.result(_.find(this.languages, {
            isoCode: lang
        }), 'name');
    };
    /**
     * Get default language
     *
     * @return string
     */
    LanguageProvider.prototype.getDefault = function () {
        return this.languages[0]['isoCode'];
    };
    /**
     * Get current language
     *
     * @return string
     */
    LanguageProvider.prototype.getCurrent = function () {
        return this.current;
    };
    /**
     * Get list languages
     *
     * @return LanguageInterface[]
     */
    LanguageProvider.prototype.getAvailables = function () {
        return this.languages;
    };
    LanguageProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Logger,
            TranslateService,
            ConfigProvider])
    ], LanguageProvider);
    return LanguageProvider;
}());
export { LanguageProvider };
//# sourceMappingURL=language.js.map