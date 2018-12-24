/*
 * Example use
 *		Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : '-'"
 *		Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : ['-status']"
 *		Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : ['status', '-title']"
 *    With an object with objects: *ngFor="let item of (itemsObject | keys : 'date') | orderBy : ['-order']"
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe_1 = OrderByPipe;
    OrderByPipe._orderByComparator = function (a, b) {
        if (isNaN(parseFloat(a)) ||
            !isFinite(a) ||
            (isNaN(parseFloat(b)) || !isFinite(b))) {
            // Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            // Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; // equal each other
    };
    OrderByPipe.prototype.transform = function (input, _a) {
        var _b = _a[0], config = _b === void 0 ? '+' : _b;
        if (!Array.isArray(input))
            return input;
        if (!Array.isArray(config) ||
            (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            // Basic array
            if (!propertyToCheck ||
                propertyToCheck == '-' ||
                propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property = propertyToCheck.substr(0, 1) == '+' ||
                    propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return input.sort(function (a, b) {
                    return !desc
                        ? OrderByPipe_1._orderByComparator(a[property], b[property])
                        : -OrderByPipe_1._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            // Loop over property of the array in order and sort
            return input.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? OrderByPipe_1._orderByComparator(a[property], b[property])
                        : -OrderByPipe_1._orderByComparator(a[property], b[property]);
                    // Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0)
                        return comparison;
                }
                return 0; // equal each other
            });
        }
    };
    var OrderByPipe_1;
    OrderByPipe = OrderByPipe_1 = __decorate([
        Pipe({
            name: 'orderBy',
            pure: false
        })
    ], OrderByPipe);
    return OrderByPipe;
}());
export { OrderByPipe };
//# sourceMappingURL=order-by.js.map