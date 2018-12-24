var _a;
import { createEntityAdapter } from '@ngrx/entity';
import { RateActionTypes } from "../rates/rates.actions";
import { createFeatureSelector } from "@ngrx/store";
export var adapter = createEntityAdapter();
export var initialState = adapter.getInitialState();
// Section 2
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case RateActionTypes.ADD_RATE: {
            return adapter.addOne(action.payload.rate, state);
        }
        case RateActionTypes.ADD_RATES: {
            return adapter.addMany(action.payload.rates, state);
        }
        case RateActionTypes.UPDATE_RATE: {
            return adapter.updateOne(action.payload.rate, state);
        }
        case RateActionTypes.UPDATE_RATES: {
            return adapter.updateMany(action.payload.rates, state);
        }
        case RateActionTypes.DELETE_RATE: {
            return adapter.removeOne(action.payload.id, state);
        }
        case RateActionTypes.DELETE_RATES: {
            return adapter.removeMany(action.payload.ids, state);
        }
        default: {
            return state;
        }
    }
}
export var selectRateState = createFeatureSelector('rates');
export var selectAllRates = (_a = adapter.getSelectors(selectRateState), _a.selectAll), selectIds = _a.selectIds;
//# sourceMappingURL=rates.reducer.js.map