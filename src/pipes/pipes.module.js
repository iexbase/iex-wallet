var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
// pipes
import { FormatCurrencyPipe } from "@pipes/format-currency/format-currency";
import { KeysPipe } from "@pipes/keys/keys";
import { OrderByPipe } from "@pipes/order-by/order-by";
import { SunToUnitPipe } from "@pipes/sun-to-unit/sun-to-unit";
import { UnitToSunPipe } from "@pipes/unit-to-sun/unit-to-sun";
import { SunToFiatPipe } from "@pipes/sun-to-fiat/sun-to-fiat";
import { TokenToUnitPipe } from "@pipes/token-to-unit/token-to-unit";
import { FormatAssetPipe } from "@pipes/format-asset/format-asset";
import { FiatToUnitPipe } from "@pipes/fiat-to-unit/fiat-to-unit";
import { JsonIndentPipe } from "@pipes/json-indent/json-indent";
import { AddressFromHexPipe } from "@pipes/address-from-hex/address-from-hex";
var commonPipes = [
    FormatCurrencyPipe,
    KeysPipe,
    OrderByPipe,
    SunToUnitPipe,
    UnitToSunPipe,
    SunToFiatPipe,
    TokenToUnitPipe,
    FiatToUnitPipe,
    FormatAssetPipe,
    JsonIndentPipe,
    AddressFromHexPipe
];
var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        NgModule({
            declarations: commonPipes.slice(),
            exports: commonPipes.slice()
        })
    ], PipesModule);
    return PipesModule;
}());
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map