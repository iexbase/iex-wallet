var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Logger } from "@providers/logger/logger";
import { Store } from "@ngrx/store";
import { WalletProvider } from "@providers/wallet/wallet";
import * as os from "os";
import { AppProvider } from "@providers/app/app";
import * as SkinActions from "@redux/skins/skins.actions";
import { ConfigProvider } from "@providers/config/config";
var AppComponent = /** @class */ (function () {
    function AppComponent(store, wallet, config, appProvider, logger) {
        this.store = store;
        this.wallet = wallet;
        this.config = config;
        this.appProvider = appProvider;
        this.logger = logger;
        if (!AppComponent_1.isElectronPlatform())
            throw new Error('Web version is not available');
    }
    AppComponent_1 = AppComponent;
    AppComponent.prototype.ngOnInit = function () {
        try {
            var osPlatform = os.platform();
            this.onPlatformReady(osPlatform);
        }
        catch (e) {
            this.logger.error('Platform is not ready.', e);
        }
        this.store.dispatch(new SkinActions.AddSkin({
            skin: {
                id: 1,
                name: this.config.get('skins.name')
            }
        }));
    };
    AppComponent.prototype.onPlatformReady = function (readySource) {
        var _this = this;
        this.appProvider
            .load()
            .then(function () {
            _this.onAppLoad(readySource);
        })
            .catch(function (err) {
            var message;
            try {
                message = err instanceof Error ? err.toString() : JSON.stringify(err);
            }
            catch (error) {
                message = 'Unknown error';
            }
            _this.logger.error(message);
        });
    };
    AppComponent.prototype.onAppLoad = function (readySource) {
        this.logger.info('Platform ready (' +
            readySource +
            '): ' +
            this.appProvider.info.nameCase +
            ' - v' +
            this.appProvider.info.version +
            ' (' + os.EOL + ')');
    };
    AppComponent.isElectronPlatform = function () {
        var userAgent = navigator && navigator.userAgent
            ? navigator.userAgent.toLowerCase()
            : null;
        return userAgent && userAgent.indexOf(' electron/') > -1;
    };
    var AppComponent_1;
    AppComponent = AppComponent_1 = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [Store,
            WalletProvider,
            ConfigProvider,
            AppProvider,
            Logger])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map