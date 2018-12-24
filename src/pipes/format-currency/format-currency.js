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
var FormatCurrencyPipe = /** @class */ (function () {
    function FormatCurrencyPipe(decimalPipe) {
        this.decimalPipe = decimalPipe;
    }
    FormatCurrencyPipe.prototype.transform = function (amount, currencyCode, customPrecision, hideCode) {
        var precision = customPrecision || customPrecision === 0
            ? customPrecision : this.getPrecision(currencyCode);
        var numericValue = this.decimalPipe.transform(amount, this.getPrecisionString(precision));
        return (hideCode == false) ? numericValue :
            currencyCode.toUpperCase() === 'USD' ?
                "$" + numericValue : numericValue + " " + currencyCode;
    };
    FormatCurrencyPipe.prototype.getPrecision = function (currencyCode) {
        return currencyCode.toUpperCase() === 'JPY' ? 0 : 2;
    };
    FormatCurrencyPipe.prototype.getPrecisionString = function (precision) {
        return "1." + precision + "-" + precision;
    };
    FormatCurrencyPipe = __decorate([
        Pipe({
            name: 'formatCurrency'
        }),
        __metadata("design:paramtypes", [DecimalPipe])
    ], FormatCurrencyPipe);
    return FormatCurrencyPipe;
}());
export { FormatCurrencyPipe };
//# sourceMappingURL=format-currency.js.map