var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
var NoFundsTrxComponent = /** @class */ (function () {
    /**
     * Object creation NoFundsTrxComponent
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     */
    function NoFundsTrxComponent(dialogRef) {
        this.dialogRef = dialogRef;
        //
    }
    /**
     * Close modal and open Receive
     *
     * @return void
     */
    NoFundsTrxComponent.prototype.goToReceive = function () {
        this.dialogRef.close();
    };
    NoFundsTrxComponent = __decorate([
        Component({
            selector: 'no-funds-trx',
            templateUrl: './no-funds-trx.component.html',
            styleUrls: ['./no-funds-trx.component.scss'],
        }),
        __metadata("design:paramtypes", [MatDialogRef])
    ], NoFundsTrxComponent);
    return NoFundsTrxComponent;
}());
export { NoFundsTrxComponent };
//# sourceMappingURL=no-funds-trx.component.js.map