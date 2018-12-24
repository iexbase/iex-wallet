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
// Providers
import { AddressProvider } from "@providers/address/address";
var ConfirmTxComponent = /** @class */ (function () {
    /**
     * Object creation ConfirmTxComponent
     *
     * @param {AddressProvider} addressProvider - Address provider
     */
    function ConfirmTxComponent(addressProvider) {
        this.addressProvider = addressProvider;
        //
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ConfirmTxComponent.prototype, "txp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ConfirmTxComponent.prototype, "token", void 0);
    ConfirmTxComponent = __decorate([
        Component({
            selector: 'confirm-tx',
            templateUrl: './confirm-tx.component.html',
            styleUrls: ['./confirm-tx.component.scss'],
        }),
        __metadata("design:paramtypes", [AddressProvider])
    ], ConfirmTxComponent);
    return ConfirmTxComponent;
}());
export { ConfirmTxComponent };
//# sourceMappingURL=confirm-tx.component.js.map