var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var TimeProvider = /** @class */ (function () {
    function TimeProvider() {
    }
    TimeProvider.prototype.withinSameMonth = function (time1, time2) {
        if (!time1 || !time2)
            return false;
        var date1 = new Date(time1);
        var date2 = new Date(time2);
        return this.getMonthYear(date1) === this.getMonthYear(date2);
    };
    TimeProvider.prototype.withinPastDay = function (time) {
        var now = new Date();
        var date = new Date(time);
        return now.getTime() - date.getTime() < 1000 * 60 * 60 * 24;
    };
    TimeProvider.prototype.isDateInCurrentMonth = function (date) {
        var now = new Date();
        return this.getMonthYear(now) === this.getMonthYear(date);
    };
    TimeProvider.prototype.getMonthYear = function (date) {
        return date.getMonth() + "-" + date.getFullYear();
    };
    TimeProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], TimeProvider);
    return TimeProvider;
}());
export { TimeProvider };
//# sourceMappingURL=time.js.map