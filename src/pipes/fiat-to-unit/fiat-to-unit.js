var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DecimalPipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { RateProvider } from '@providers/rate/rate';
var FiatToUnitPipe = /** @class */ (function () {
    function FiatToUnitPipe(rateProvider, decimalPipe) {
        this.rateProvider = rateProvider;
        this.decimalPipe = decimalPipe;
    }
    FiatToUnitPipe.prototype.transform = function (amount, coin, isDecimal) {
        if (isDecimal === void 0) { isDecimal = true; }
        if (coin.toUpperCase() == 'TRX') {
            return amount;
        }
        var amount_ = this.rateProvider.fromFiat(amount, coin.toUpperCase());
        if (isDecimal == false) {
            return (amount_ / 1e6 || 0).toFixed(6);
        }
        return (this.decimalPipe.transform(amount_ / 1e6 || 0, '1.2-6'));
    };
    FiatToUnitPipe = __decorate([
        Pipe({
            name: 'fiatToUnit',
            pure: false
        }),
        __metadata("design:paramtypes", [RateProvider,
            DecimalPipe])
    ], FiatToUnitPipe);
    return FiatToUnitPipe;
}());
export { FiatToUnitPipe };
//# sourceMappingURL=fiat-to-unit.js.map