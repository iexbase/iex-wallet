var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
// Providers
import { Logger } from "@providers/logger/logger";
var ElectronProvider = /** @class */ (function () {
    /**
     * Object creation ElectronProvider
     *
     * @param logger - Logger
     */
    function ElectronProvider(logger) {
        this.logger = logger;
        this.logger.debug('ElectronProvider initialized');
    }
    Object.defineProperty(ElectronProvider.prototype, "isElectronApp", {
        /**
         * determines if SPA is running in Electron
         */
        get: function () {
            return !!window.navigator.userAgent.match(/Electron/);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "desktopCapturer", {
        get: function () {
            return this.electron ? this.electron.desktopCapturer : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "ipcRenderer", {
        get: function () {
            return this.electron ? this.electron.ipcRenderer : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "remote", {
        get: function () {
            return this.electron ? this.electron.remote : null;
        },
        enumerable: true,
        configurable: true
    });
    ElectronProvider.prototype.readFromClipboard = function () {
        var clipboard = window.require('electron').clipboard;
        return clipboard.readText();
    };
    ElectronProvider.prototype.writeToClipboard = function (text) {
        var clipboard = window.require('electron').clipboard;
        return clipboard.writeText(text);
    };
    ElectronProvider.prototype.clearClipboard = function () {
        var clipboard = window.require('electron').clipboard;
        clipboard.clear();
    };
    ElectronProvider.prototype.openExternalLink = function (url) {
        var shell = window.require('electron').shell;
        return shell.openExternal(url);
    };
    Object.defineProperty(ElectronProvider.prototype, "webFrame", {
        get: function () {
            return this.electron ? this.electron.webFrame : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "clipboard", {
        get: function () {
            return this.electron ? this.electron.clipboard : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "crashReporter", {
        get: function () {
            return this.electron ? this.electron.crashReporter : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "process", {
        get: function () {
            return this.remote ? this.remote.process : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "nativeImage", {
        get: function () {
            return this.electron ? this.electron.nativeImage : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "screen", {
        get: function () {
            return this.electron ? this.electron.screen : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronProvider.prototype, "shell", {
        get: function () {
            return this.electron ? this.electron.shell : null;
        },
        enumerable: true,
        configurable: true
    });
    ElectronProvider.prototype.getLocalPath = function () {
        var remote = window.require('electron').remote;
        return remote.app.getPath('userData');
    };
    Object.defineProperty(ElectronProvider.prototype, "electron", {
        get: function () {
            if (!this._electron) {
                if (window && window.require) {
                    this._electron = window.require('electron');
                    return this._electron;
                }
                return null;
            }
            return this._electron;
        },
        enumerable: true,
        configurable: true
    });
    ElectronProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Logger])
    ], ElectronProvider);
    return ElectronProvider;
}());
export { ElectronProvider };
//# sourceMappingURL=electron.js.map