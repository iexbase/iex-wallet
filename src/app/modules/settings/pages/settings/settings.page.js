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
import { Router } from "@angular/router";
var SettingsPage = /** @class */ (function () {
    /**
     * Object creation SettingsPage
     *
     * @param {Router} router - Router provider
     */
    function SettingsPage(router) {
        this.router = router;
        //
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    SettingsPage.prototype.ngOnInit = function () {
        this.navs = [{
                link: '/settings/alt-currency',
                name: 'Settings.Navigation.Currency',
            }, {
                link: '/settings/language',
                name: 'Settings.Navigation.Language'
            }, {
                link: '/settings/session-log',
                name: 'Settings.Navigation.SessionLog'
            }, {
                link: '/settings/skins',
                name: 'Settings.Navigation.Skins'
            }];
        if (this.settingsView != undefined) {
            this.router.navigate(["/settings/" + this.settingsView]);
        }
        else {
            this.router.navigate(["/settings/alt-currency"]);
        }
    };
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], SettingsPage.prototype, "settingsView", void 0);
    SettingsPage = __decorate([
        Component({
            selector: 'settings-page',
            templateUrl: './settings.page.html',
            styleUrls: ['./settings.page.scss'],
        }),
        __metadata("design:paramtypes", [Router])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.page.js.map