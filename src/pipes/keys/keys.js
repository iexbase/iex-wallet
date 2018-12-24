/*
 * Example use
 *  Simple: *ngFor="let item of giftCards | keys"
 *	With an object with objects: *ngFor="let item of (itemsObject | keys : 'date') | orderBy : ['-order']"
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, orderBy) {
        var keys = [];
        for (var key in value) {
            keys.push({
                key: key,
                value: value[key],
                order: orderBy ? value[key][orderBy] : null
            });
        }
        return keys;
    };
    KeysPipe = __decorate([
        Pipe({
            name: 'keys'
        })
    ], KeysPipe);
    return KeysPipe;
}());
export { KeysPipe };
//# sourceMappingURL=keys.js.map