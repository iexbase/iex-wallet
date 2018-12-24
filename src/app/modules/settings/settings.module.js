var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from "@shared/shared.module";
import { MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
// Routing
import { SettingsRoutingModule } from "./settings-routing.module";
// Pages
import { SettingsPage } from "@modules/settings/pages/settings/settings.page";
import { AltCurrencyPage } from "@modules/settings/pages/alt-currency/alt-currency.page";
import { SkinsPage } from "@modules/settings/pages/skins/skins.page";
import { SessionLogPage } from "@modules/settings/pages/session-log/session-log.page";
import { LanguagePage } from "@modules/settings/pages/language/language.page";
var settingsPage = [
    SettingsPage,
    AltCurrencyPage,
    LanguagePage,
    SessionLogPage,
    SkinsPage
];
var settingsComponent = [];
var settingsMaterial = [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule
];
var settingsModules = [
    SharedModule,
    SettingsRoutingModule
];
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        NgModule({
            imports: settingsModules.concat(settingsMaterial),
            declarations: settingsPage.concat(settingsComponent),
            exports: settingsModules.slice(),
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
    ], SettingsModule);
    return SettingsModule;
}());
export { SettingsModule };
//# sourceMappingURL=settings.module.js.map