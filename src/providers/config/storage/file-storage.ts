/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Inject} from '@angular/core';

// StorageService to persist data in local json store
// Class uses electron-store module from https://github.com/sindresorhus/electron-store
export class FileStorage {
    /**
     * The electron store object.
     *
     * @return any
     */
    private store;

    /**
     *  Creates new store object and initialize JSON store with given storeName
     *  at data path by default.
     *  By default, JSON store will be created if no file found at given location
     *
     *  @param dir - local directory project
     *  @param storeName - file name
     * */
    constructor(
        public dir: string,
        @Inject('storeName') storeName: string
    ) {
        if (this.isElectron()) {
            const Store = window.require('electron-store');
            this.store = new Store({'name': storeName});
        }
    }

    /**
     * Check if app is run as electron app
     *
     * @return boolean
     */
    isElectron = () => {
        return window && window.process && window.process.type;
    }

    /**
     * Get an item or defaultValue if the item does not exist.
     *
     * @return any
     */
    get(key: string, defaultValue?: any): any {
        return this.store.get(key, defaultValue);
    }

    /**
     *  Set an item.
     *
     *  @return void
     * */
    set(key: any, value?: any ): void {
        if (typeof(key) == 'object') {
            return this.store.set(key);
        }

        this.store.set(key, value);
    }

    /**
     * Check if an item exists.
     *
     * @return boolean
     */
    has(key: any): boolean {
        return this.store.has(key);
    }

    /**
     * Delete an item.
     *
     * @return void
     */
    remove(key: any): void {
        this.store.delete(key);
    }

    /**
     * Clear all items in JSON store
     * Note: be careful as whole JSON content will be dismissed
     *
     * @return void
     */
    clear(): void {
        this.store.clear();
    }

    /**
     * Get the store object.
     *
     * @return any
     */
    getStore() {
        return this.store.store;
    }
}
