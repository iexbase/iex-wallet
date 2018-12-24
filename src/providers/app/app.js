var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
// Providers
import { Logger } from "@providers/logger/logger";
import { ConfigProvider } from "@providers/config/config";
import { LanguageProvider } from "@providers/language/language";
var AppProvider = /** @class */ (function () {
    /**
     * Object creation AppProvider
     *
     * @param logger - Logger
     * @param http - Http Client
     * @param language - Language Provider
     * @param store - Reactive State
     * @param config - Config Provider
     */
    function AppProvider(logger, http, language, store, config) {
        this.logger = logger;
        this.http = http;
        this.language = language;
        this.store = store;
        this.config = config;
        /**
         * We declare a variable with static parameters.
         *
         * @var App
         */
        this.info = {
            packageName: null,
            packageDescription: null,
            appUri: null,
            name: null,
            nameNoSpace: null,
            nameCase: null,
            nameCaseNoSpace: null,
            gitHubRepoUrl: null,
            gitHubRepoBugs: null,
            version: null,
        };
        /**
         * Project Baseline File
         *
         * @var string
         */
        this.jsonPathApp = 'assets/appConfig.json';
        this.logger.debug('AppProvider initialized');
    }
    /**
     * Asynchronous data loading
     *
     * @return void
     */
    AppProvider.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.getInfo(), this.loadProviders()])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Asynchronous data writing to a variable
     *
     * @return Promise
     */
    AppProvider.prototype.getInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Promise.all([
                                this.getAppInfo()
                            ])];
                    case 1:
                        _a.info = (_b.sent())[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Asynchronous loading of all providers
     *
     * @return Promise
     */
    AppProvider.prototype.loadProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.config.loadConfig()];
                    case 1:
                        _a.sent();
                        this.language.load();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get information from the base file
     *
     * @return Promise
     */
    AppProvider.prototype.getAppInfo = function () {
        return this.http.get(this.jsonPathApp).toPromise();
    };
    AppProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Logger,
            HttpClient,
            LanguageProvider,
            Store,
            ConfigProvider])
    ], AppProvider);
    return AppProvider;
}());
export { AppProvider };
//# sourceMappingURL=app.js.map