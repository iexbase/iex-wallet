import { createEntityAdapter } from "@ngrx/entity";
import { LanguageActionTypes } from "./language.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export var adapter = createEntityAdapter();
export var initialState = adapter.getInitialState();
// Section 2
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case LanguageActionTypes.SET_LANGUAGE: {
            return adapter.addOne(action.payload.language, state);
        }
        default: {
            return state;
        }
    }
}
export var selectLanguageState = createFeatureSelector('password');
export var selectAllLanguage = adapter.getSelectors(selectLanguageState).selectAll;
export var getLanguage = function (id) { return createSelector(selectAllLanguage, function (state) {
    if (state) {
        return state.find(function (item) {
            return item.id === id;
        });
    }
    else {
        return {};
    }
}); };
//# sourceMappingURL=language.reducer.js.map