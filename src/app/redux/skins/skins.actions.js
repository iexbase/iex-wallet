export var SkinActionTypes;
(function (SkinActionTypes) {
    SkinActionTypes["ADD_SKIN"] = "[Skins] Add Skin";
    SkinActionTypes["UPDATE_SKIN"] = "[Skins] Update Skin";
    SkinActionTypes["DELETE_SKIN"] = "[Skins] Delete Skin";
})(SkinActionTypes || (SkinActionTypes = {}));
var AddSkin = /** @class */ (function () {
    function AddSkin(payload) {
        this.payload = payload;
        this.type = SkinActionTypes.ADD_SKIN;
    }
    return AddSkin;
}());
export { AddSkin };
var UpdateSkin = /** @class */ (function () {
    function UpdateSkin(payload) {
        this.payload = payload;
        this.type = SkinActionTypes.UPDATE_SKIN;
    }
    return UpdateSkin;
}());
export { UpdateSkin };
var DeleteSkin = /** @class */ (function () {
    function DeleteSkin(payload) {
        this.payload = payload;
        this.type = SkinActionTypes.DELETE_SKIN;
    }
    return DeleteSkin;
}());
export { DeleteSkin };
//# sourceMappingURL=skins.actions.js.map