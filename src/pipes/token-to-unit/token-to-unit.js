var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
import { Base64 } from "js-base64";
export var ContractType;
(function (ContractType) {
    ContractType[ContractType["ACCOUNTCREATECONTRACT"] = 0] = "ACCOUNTCREATECONTRACT";
    ContractType[ContractType["TRANSFERCONTRACT"] = 1] = "TRANSFERCONTRACT";
    ContractType[ContractType["TRANSFERASSETCONTRACT"] = 2] = "TRANSFERASSETCONTRACT";
    ContractType[ContractType["VOTEASSETCONTRACT"] = 3] = "VOTEASSETCONTRACT";
    ContractType[ContractType["VOTEWITNESSCONTRACT"] = 4] = "VOTEWITNESSCONTRACT";
    ContractType[ContractType["WITNESSCREATECONTRACT"] = 5] = "WITNESSCREATECONTRACT";
    ContractType[ContractType["ASSETISSUECONTRACT"] = 6] = "ASSETISSUECONTRACT";
    ContractType[ContractType["DEPLOYCONTRACT"] = 7] = "DEPLOYCONTRACT";
    ContractType[ContractType["WITNESSUPDATECONTRACT"] = 8] = "WITNESSUPDATECONTRACT";
    ContractType[ContractType["PARTICIPATEASSETISSUECONTRACT"] = 9] = "PARTICIPATEASSETISSUECONTRACT";
    ContractType[ContractType["ACCOUNTUPDATECONTRACT"] = 10] = "ACCOUNTUPDATECONTRACT";
    ContractType[ContractType["FREEZEBALANCECONTRACT"] = 11] = "FREEZEBALANCECONTRACT";
    ContractType[ContractType["UNFREEZEBALANCECONTRACT"] = 12] = "UNFREEZEBALANCECONTRACT";
    ContractType[ContractType["WITHDRAWBALANCECONTRACT"] = 13] = "WITHDRAWBALANCECONTRACT";
    ContractType[ContractType["UNFREEZEASSETCONTRACT"] = 14] = "UNFREEZEASSETCONTRACT";
    ContractType[ContractType["UPDATEASSETCONTRACT"] = 15] = "UPDATEASSETCONTRACT";
    ContractType[ContractType["CUSTOMCONTRACT"] = 20] = "CUSTOMCONTRACT";
})(ContractType || (ContractType = {}));
var TokenToUnitPipe = /** @class */ (function () {
    function TokenToUnitPipe() {
    }
    TokenToUnitPipe.prototype.transform = function (item) {
        this.item = item;
        switch (item['contractType']) {
            case ContractType.TRANSFERCONTRACT:
                return (item['contractData']['amount'] / 1e6);
            case ContractType.TRANSFERASSETCONTRACT:
                return (item['contractData']['amount']);
            case ContractType.UNFREEZEBALANCECONTRACT:
                return '';
            case ContractType.FREEZEBALANCECONTRACT:
                return item['contractData']['frozen_balance'] / 1e6;
        }
    };
    TokenToUnitPipe.prototype.getAssetName = function () {
        return Base64.decode(this.item['contractData']['asset_name']);
    };
    TokenToUnitPipe = __decorate([
        Pipe({
            name: 'tokenToUnit',
            pure: false
        }),
        __metadata("design:paramtypes", [])
    ], TokenToUnitPipe);
    return TokenToUnitPipe;
}());
export { TokenToUnitPipe };
//# sourceMappingURL=token-to-unit.js.map