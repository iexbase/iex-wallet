export var LanguageActionTypes;
(function (LanguageActionTypes) {
    LanguageActionTypes["SET_LANGUAGE"] = "[Language] Set localization";
})(LanguageActionTypes || (LanguageActionTypes = {}));
var setLanguage = /** @class */ (function () {
    function setLanguage(payload) {
        this.payload = payload;
        this.type = LanguageActionTypes.SET_LANGUAGE;
    }
    return setLanguage;
}());
export { setLanguage };
//# sourceMappingURL=language.actions.js.map