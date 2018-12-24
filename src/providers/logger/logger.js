var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* tslint:disable:no-console */
import { Injectable, isDevMode } from '@angular/core';
import * as _ from 'lodash';
var Logger = /** @class */ (function () {
    /**
     * Object creation Logger
     */
    function Logger() {
        this.logs = [];
        this.levels = [
            { level: 'error', weight: 1, label: 'Error', def: false },
            { level: 'warn', weight: 2, label: 'Warning', def: false },
            { level: 'info', weight: 3, label: 'Info', def: true },
            { level: 'debug', weight: 4, label: 'Debug', def: false }
        ];
        // Create an array of level weights for performant filtering.
        this.weight = {};
        for (var i = 0; i < this.levels.length; i++) {
            this.weight[this.levels[i].level] = this.levels[i].weight;
        }
    }
    Logger.prototype.getMessage = function (message) {
        var isUndefined = _.isUndefined(message);
        var isNull = _.isNull(message);
        var isError = _.isError(message);
        var isObject = _.isObject(message);
        if (isUndefined)
            return 'undefined';
        else if (isNull)
            return 'null';
        else if (isError)
            return message.message;
        else if (isObject)
            return JSON.stringify(message);
        else
            return message;
    };
    Logger.prototype.error = function (_message) {
        var _optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _optionalParams[_i - 1] = arguments[_i];
        }
        var type = 'error';
        var args = this.processingArgs(arguments);
        this.log("[" + type + "] " + args);
        this.add(type, args);
    };
    Logger.prototype.debug = function (_message) {
        var _optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _optionalParams[_i - 1] = arguments[_i];
        }
        var type = 'debug';
        var args = this.processingArgs(arguments);
        if (isDevMode())
            this.log("[" + type + "] " + args);
        this.add(type, args);
    };
    Logger.prototype.info = function (_message) {
        var _optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _optionalParams[_i - 1] = arguments[_i];
        }
        var type = 'info';
        var args = this.processingArgs(arguments);
        if (isDevMode())
            this.log("[" + type + "] " + args);
        this.add(type, args);
    };
    Logger.prototype.warn = function (_message) {
        var _optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _optionalParams[_i - 1] = arguments[_i];
        }
        var type = 'warn';
        var args = this.processingArgs(arguments);
        if (isDevMode())
            this.log("[" + type + "] " + args);
        this.add(type, args);
    };
    Logger.prototype.getLevels = function () {
        return this.levels;
    };
    Logger.prototype.getWeight = function (weight) {
        return _.find(this.levels, function (l) {
            return l.weight == weight;
        });
    };
    Logger.prototype.getDefaultWeight = function () {
        return _.find(this.levels, function (l) {
            return l.def;
        });
    };
    Logger.prototype.add = function (level, msg) {
        msg = msg.replace('/privateKey.*/', '[...]');
        msg = msg.replace('/PrivateKey.*/', '[...]');
        msg = msg.replace('/password.*/', '[...]');
        msg = msg.replace('/walletPrivKey.*/', 'walletPrivKey:[...]');
        var newLog = {
            timestamp: new Date().toISOString(),
            level: level,
            msg: msg
        };
        this.logs.push(newLog);
    };
    /**
     * Returns logs of <= to filteredWeight
     * @param filterWeight
     */
    Logger.prototype.get = function (filterWeight) {
        var _this = this;
        var filteredLogs = this.logs;
        if (filterWeight != undefined) {
            filteredLogs = _.filter(this.logs, function (l) {
                return _this.weight[l.level] <= filterWeight;
            });
        }
        return filteredLogs;
    };
    Logger.prototype.processingArgs = function (argsValues) {
        var _this = this;
        var args = Array.prototype.slice.call(argsValues);
        args = args.map(function (v) {
            try {
                v = _this.getMessage(v);
            }
            catch (e) {
                console.log('Error at log decorator:', e);
                v = 'Unknown message';
            }
            return v;
        });
        return args.join(' ');
    };
    Logger.prototype.log = function (msg) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.log.apply(console, [msg].concat(optionalParams));
    };
    Logger = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], Logger);
    return Logger;
}());
export { Logger };
//# sourceMappingURL=logger.js.map