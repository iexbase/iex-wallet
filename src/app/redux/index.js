import * as fromWallet from "./wallet/wallet.reducer";
import * as fromRate from "./rates/rates.reducer";
import * as fromSkin from "./skins/skins.reducer";
import * as fromLanguage from "./language/language.reducer";
import env from '../../environments';
import { storeLogger } from "ngrx-store-logger";
export var appReducer = {
    wallets: fromWallet.reducer,
    rates: fromRate.reducer,
    skins: fromSkin.reducer,
    language: fromLanguage.reducer
};
export function logger(reducer) {
    // default, no options
    return storeLogger()(reducer);
}
export var metaReducers = (env.name != 'production')
    ? [logger]
    : [];
//# sourceMappingURL=index.js.map