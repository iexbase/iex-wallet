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
import { LanguageProvider } from "@providers/language/language";
var LanguagePage = /** @class */ (function () {
    /**
     * Object creation LanguagePage
     *
     * @param {LanguageProvider} languageProvider - Language provider
     */
    function LanguagePage(languageProvider) {
        this.languageProvider = languageProvider;
        // Activate this page
        this.settingsView = 'language';
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    LanguagePage.prototype.ngOnInit = function () {
        this.currentLanguage = this.languageProvider.getCurrent();
        this.languages = this.languageProvider.getAvailables();
    };
    /**
     * Change language
     *
     * @param {string} newLang - New language
     * @return void
     */
    LanguagePage.prototype.save = function (newLang) {
        this.languageProvider.set(newLang);
    };
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], LanguagePage.prototype, "settingsView", void 0);
    LanguagePage = __decorate([
        Component({
            selector: 'language',
            templateUrl: './language.page.html',
            styleUrls: ['./language.page.scss'],
        }),
        __metadata("design:paramtypes", [LanguageProvider])
    ], LanguagePage);
    return LanguagePage;
}());
export { LanguagePage };
//# sourceMappingURL=language.page.js.map