var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
// Providers
import { FileStorage } from "./storage/file-storage";
import { Logger } from "@providers/logger/logger";
import { ElectronProvider } from "@providers/electron/electron";
var ConfigProvider = /** @class */ (function () {
    /**
     * Object creation ConfigProvider
     *
     * @param logger - Logger
     * @param electron - Electron Provider
     */
    function ConfigProvider(logger, electron) {
        this.logger = logger;
        this.electron = electron;
        this.logger.debug('ConfigProvider initialized');
        this.configDefault = {
            meta: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            wallet: {
                reconnectDelay: 5000,
                settings: {
                    unitName: 'TRON',
                    unitToSun: 1e6,
                    unitDecimals: 6,
                    alternativeName: 'US Dollar',
                    alternativeIsoCode: 'USD',
                    defaultLanguage: '',
                }
            },
            skins: {
                name: 'default',
                options: {
                    colors: true,
                    textures: true
                }
            },
            download: {
                iexbase: {
                    url: 'https://tronwallet.iexbase.com'
                },
            },
            log: {
                weight: 3
            }
        };
    }
    /**
     * Load the configuration file
     *
     * @return void
     */
    ConfigProvider.prototype.loadConfig = function () {
        this.logger.debug('File system started: ', 'wallet.conf');
        this.fileStorage = new FileStorage(this.electron.getLocalPath(), 'wallet.conf');
        if (!this.fileStorage.has('meta')) {
            this.fileStorage.set(this.getDefaults());
        }
    };
    /**
     * Updating and writing new data to the configuration file
     *
     * @param key - Key
     * @param value - Data
     * @return void
     */
    ConfigProvider.prototype.set = function (key, value) {
        this.fileStorage.set('updatedAt', new Date().toISOString());
        this.fileStorage.set(key, value);
    };
    /**
     * Getting values by key
     *
     * @param key - Key
     * @param defaultValue - Default data
     *
     * @return string | any
     */
    ConfigProvider.prototype.get = function (key, defaultValue) {
        // In case there is no key, we get all the data.
        if (key == undefined)
            return this.fileStorage.getStore();
        return this.fileStorage.get(key, defaultValue);
    };
    /**
     * All data
     *
     * @return Config
     */
    ConfigProvider.prototype.getDefaults = function () {
        return this.configDefault;
    };
    ConfigProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Logger,
            ElectronProvider])
    ], ConfigProvider);
    return ConfigProvider;
}());
export { ConfigProvider };
//# sourceMappingURL=config.js.map