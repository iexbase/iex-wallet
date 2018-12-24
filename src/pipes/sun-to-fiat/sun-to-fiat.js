var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from "@angular/core";
import { ConfigProvider } from "@providers/config/config";
import { RateProvider } from "@providers/rate/rate";
import { DecimalPipe } from "@angular/common";
var SunToFiatPipe = /** @class */ (function () {
    function SunToFiatPipe(configProvider, rateProvider, decimalPipe) {
        this.configProvider = configProvider;
        this.rateProvider = rateProvider;
        this.decimalPipe = decimalPipe;
        //this.configProvider.loadConfig();
        this.unit = this.configProvider.get('wallet.settings.alternativeIsoCode');
    }
    SunToFiatPipe.prototype.transform = function (amount, isoCode) {
        if (isoCode === void 0) { isoCode = false; }
        var amount_ = this.rateProvider.toFiat(amount, this.unit);
        return (this.decimalPipe.transform(amount_ || 0, (this.unit == 'BTC') ? '1.8-8' : '1.2-2') + (isoCode == true ? this.unit.toUpperCase() : ''));
    };
    SunToFiatPipe = __decorate([
        Pipe({
            name: 'sunToFiat',
            pure: false
        }),
        __metadata("design:paramtypes", [ConfigProvider,
            RateProvider,
            DecimalPipe])
    ], SunToFiatPipe);
    return SunToFiatPipe;
}());
export { SunToFiatPipe };
//# sourceMappingURL=sun-to-fiat.js.map