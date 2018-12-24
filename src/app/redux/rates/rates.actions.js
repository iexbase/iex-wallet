export var RateActionTypes;
(function (RateActionTypes) {
    RateActionTypes["ADD_RATE"] = "[Rate] Add Rate";
    RateActionTypes["ADD_RATES"] = "[Rate] Add Rates";
    RateActionTypes["UPDATE_RATE"] = "[Rate] Update Rate";
    RateActionTypes["UPDATE_RATES"] = "[Rate] Update Rates";
    RateActionTypes["DELETE_RATE"] = "[Rate] Delete Rate";
    RateActionTypes["DELETE_RATES"] = "[Rate] Delete Rates";
    RateActionTypes["CLEAR_RATES"] = "[Rate] Clear Rates";
})(RateActionTypes || (RateActionTypes = {}));
var AddRate = /** @class */ (function () {
    function AddRate(payload) {
        this.payload = payload;
        this.type = RateActionTypes.ADD_RATE;
    }
    return AddRate;
}());
export { AddRate };
var AddRates = /** @class */ (function () {
    function AddRates(payload) {
        this.payload = payload;
        this.type = RateActionTypes.ADD_RATES;
    }
    return AddRates;
}());
export { AddRates };
var UpdateRate = /** @class */ (function () {
    function UpdateRate(payload) {
        this.payload = payload;
        this.type = RateActionTypes.UPDATE_RATE;
    }
    return UpdateRate;
}());
export { UpdateRate };
var UpdateRates = /** @class */ (function () {
    function UpdateRates(payload) {
        this.payload = payload;
        this.type = RateActionTypes.UPDATE_RATES;
    }
    return UpdateRates;
}());
export { UpdateRates };
var DeleteRate = /** @class */ (function () {
    function DeleteRate(payload) {
        this.payload = payload;
        this.type = RateActionTypes.DELETE_RATE;
    }
    return DeleteRate;
}());
export { DeleteRate };
var DeleteRates = /** @class */ (function () {
    function DeleteRates(payload) {
        this.payload = payload;
        this.type = RateActionTypes.DELETE_RATES;
    }
    return DeleteRates;
}());
export { DeleteRates };
var ClearRates = /** @class */ (function () {
    function ClearRates() {
        this.type = RateActionTypes.CLEAR_RATES;
    }
    return ClearRates;
}());
export { ClearRates };
//# sourceMappingURL=rates.actions.js.map