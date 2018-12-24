var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
var ReceiveRequestComponent = /** @class */ (function () {
    /**
     * Create a new ReceiveRequestComponent object
     */
    function ReceiveRequestComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ReceiveRequestComponent.prototype, "params", void 0);
    ReceiveRequestComponent = __decorate([
        Component({
            selector: 'receive-request',
            templateUrl: './receive-request.component.html',
            styleUrls: ['./receive-request.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], ReceiveRequestComponent);
    return ReceiveRequestComponent;
}());
export { ReceiveRequestComponent };
//# sourceMappingURL=receive-request.component.js.map