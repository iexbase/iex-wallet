var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsPage } from "@modules/settings/pages/settings/settings.page";
import { AltCurrencyPage } from "@modules/settings/pages/alt-currency/alt-currency.page";
import { LanguagePage } from "@modules/settings/pages/language/language.page";
import { SessionLogPage } from "@modules/settings/pages/session-log/session-log.page";
import { SkinsPage } from "@modules/settings/pages/skins/skins.page";
var routes = [
    {
        path: '', component: SettingsPage,
        children: [
            {
                path: 'alt-currency',
                component: AltCurrencyPage
            },
            {
                path: 'language',
                component: LanguagePage
            },
            {
                path: 'session-log',
                component: SessionLogPage
            },
            {
                path: 'skins',
                component: SkinsPage
            }
        ]
    }
];
var SettingsRoutingModule = /** @class */ (function () {
    function SettingsRoutingModule() {
    }
    SettingsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], SettingsRoutingModule);
    return SettingsRoutingModule;
}());
export { SettingsRoutingModule };
//# sourceMappingURL=settings-routing.module.js.map