var _a;
import { createEntityAdapter } from "@ngrx/entity";
import { SkinActionTypes } from "./skins.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export var adapter = createEntityAdapter();
export var initialState = adapter.getInitialState();
// Section 2
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SkinActionTypes.ADD_SKIN: {
            return adapter.addOne(action.payload.skin, state);
        }
        case SkinActionTypes.UPDATE_SKIN: {
            return adapter.updateOne(action.payload.skin, state);
        }
        case SkinActionTypes.DELETE_SKIN: {
            return adapter.removeOne(action.payload.id, state);
        }
        default: {
            return state;
        }
    }
}
export var selectSkinState = createFeatureSelector('skins');
export var selectAllSkins = (_a = adapter.getSelectors(selectSkinState), _a.selectAll), selectIds = _a.selectIds;
export var findSkinById = function (id) { return createSelector(selectAllSkins, function (state) {
    if (state) {
        return state.find(function (item) {
            return item.id === id;
        });
    }
    else {
        return {};
    }
}); };
//# sourceMappingURL=skins.reducer.js.map