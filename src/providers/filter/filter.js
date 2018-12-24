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
import { Injectable } from '@angular/core';
// Providers
import { Logger } from '@providers/logger/logger';
var FilterProvider = /** @class */ (function () {
    /**
     * Object creation FilterProvider
     *
     * @param decimalPipe - Decimal
     * @param logger - Logger
     */
    function FilterProvider(decimalPipe, logger) {
        this.decimalPipe = decimalPipe;
        this.logger = logger;
        this.logger.debug('FilterProvider initialized');
        this.formats = {
            CURRENCY_SYM: '$',
            DECIMAL_SEP: '.',
            GROUP_SEP: ','
        };
    }
    FilterProvider.prototype.formatFiatAmount = function (amount) {
        var value;
        var sep;
        var group;
        var intValue;
        var floatValue;
        var finalValue;
        value = this.decimalPipe.transform(amount);
        if (!value)
            return 0;
        sep = value.indexOf(this.formats.DECIMAL_SEP);
        group = value.indexOf(this.formats.GROUP_SEP);
        if (amount >= 0) {
            if (group > 0) {
                if (sep < 0) {
                    return value;
                }
                intValue = value.substring(0, sep);
                floatValue = parseFloat(value.substring(sep));
                floatValue = floatValue.toFixed(2);
                floatValue = floatValue.toString().substring(1);
                finalValue = intValue + floatValue;
                return finalValue;
            }
            else {
                value = parseFloat(value);
                return value.toFixed(2);
            }
        }
        return 0;
    };
    FilterProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DecimalPipe,
            Logger])
    ], FilterProvider);
    return FilterProvider;
}());
export { FilterProvider };
//# sourceMappingURL=filter.js.map