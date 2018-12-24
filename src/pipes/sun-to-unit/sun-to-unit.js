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
var SunToUnitPipe = /** @class */ (function () {
    function SunToUnitPipe(decimalPipe) {
        this.decimalPipe = decimalPipe;
    }
    SunToUnitPipe.prototype.transform = function (amount, coin) {
        if (!coin)
            return this.decimalPipe.transform(amount / 1e6, '1.2-6');
        else {
            if (coin.toUpperCase() == 'TRX') {
                return this.decimalPipe.transform(amount / 1e6, '1.2-6');
            }
            else {
                return amount;
            }
        }
    };
    SunToUnitPipe = __decorate([
        Pipe({
            name: 'sunToUnit',
            pure: false
        }),
        __metadata("design:paramtypes", [DecimalPipe])
    ], SunToUnitPipe);
    return SunToUnitPipe;
}());
export { SunToUnitPipe };
//# sourceMappingURL=sun-to-unit.js.map