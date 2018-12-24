var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from "@angular/core";
// StorageService to persist data in local json store
// Class uses electron-store module from https://github.com/sindresorhus/electron-store
var FileStorage = /** @class */ (function () {
    /**
     *  Creates new store object and initialize JSON store with given storeName
     *  at data path by default.
     *  By default, JSON store will be created if no file found at given location
     *
     *  @param dir - local directory project
     *  @param storeName - file name
     * */
    function FileStorage(dir, storeName) {
        this.dir = dir;
        /**
         * Check if app is run as electron app
         *
         * @return boolean
         */
        this.isElectron = function () {
            return window && window.process && window.process.type;
        };
        if (this.isElectron()) {
            var Store = window.require('electron-store');
            this.store = new Store({ 'name': storeName });
        }
    }
    /**
     * Get an item or defaultValue if the item does not exist.
     *
     * @return any
     */
    FileStorage.prototype.get = function (key, defaultValue) {
        return this.store.get(key, defaultValue);
    };
    /**
     *  Set an item.
     *
     *  @return void
     * */
    FileStorage.prototype.set = function (key, value) {
        if (typeof (key) == 'object')
            return this.store.set(key);
        this.store.set(key, value);
    };
    /**
     * Check if an item exists.
     *
     * @return boolean
     */
    FileStorage.prototype.has = function (key) {
        return this.store.has(key);
    };
    /**
     * Delete an item.
     *
     * @return void
     */
    FileStorage.prototype.remove = function (key) {
        this.store.delete(key);
    };
    /**
     * Clear all items in JSON store
     * Note: be careful as whole JSON content will be dismissed
     *
     * @return void
     */
    FileStorage.prototype.clear = function () {
        this.store.clear();
    };
    /**
     * Get the store object.
     *
     * @return any
     */
    FileStorage.prototype.getStore = function () {
        return this.store.store;
    };
    FileStorage = __decorate([
        Injectable(),
        __param(1, Inject('storeName')),
        __metadata("design:paramtypes", [String, String])
    ], FileStorage);
    return FileStorage;
}());
export { FileStorage };
//# sourceMappingURL=file-storage.js.map