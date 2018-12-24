/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Injectable} from "@angular/core";

// Providers
import {FileStorage} from "./storage/file-storage";
import {Logger} from "@providers/logger/logger";
import {ElectronProvider} from "@providers/electron/electron";

/**
 * Configuration file interface
 */
export interface Config
{
    meta: {
        createdAt?: string,
        updatedAt?: string
    }

    wallet: {
        reconnectDelay: number;
        settings: {
            unitName: string,
            unitToSun: number,
            unitDecimals: number,
            alternativeName: string;
            alternativeIsoCode: string;
            defaultLanguage: string;
        }
    }

    skins: {
        name: string;
        options: {
            colors: boolean;
            textures: boolean;
        }
    }

    download: {
        iexbase: {
            url: string;
        }
    };

    log: {
        weight: number;
    };

    aliasFor?: any;
}

@Injectable()
export class ConfigProvider
{
    /**
     * Storage driver
     *
     * @var FileStorage
     */
    private fileStorage: FileStorage;

    /**
     * List of configuration parameters
     *
     * @var Config
     */
    public readonly configDefault: Config;

    /**
     * Object creation ConfigProvider
     *
     * @param logger - Logger
     * @param electron - Electron Provider
     */
    constructor(
        private logger: Logger,
        private electron: ElectronProvider
    ) {
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
                name: 'skin-default',
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
    public loadConfig(): void
    {
        this.logger.debug('File system started: ', 'wallet.conf');
        this.fileStorage = new FileStorage(
            this.electron.getLocalPath(),
            'wallet.conf'
        );

        if(!this.fileStorage.has('meta')) {
            this.fileStorage.set(this.getDefaults())
        }
    }

    /**
     * Updating and writing new data to the configuration file
     *
     * @param key - Key
     * @param value - Data
     * @return void
     */
    public set(key: string, value: any): void
    {
        this.fileStorage.set('updatedAt', new Date().toISOString());
        this.fileStorage.set(key, value)
    }

    /**
     * Getting values by key
     *
     * @param key - Key
     * @param defaultValue - Default data
     *
     * @return string | any
     */
    public get(key?: string, defaultValue?: any): any
    {
        // In case there is no key, we get all the data.
        if (key == undefined)
            return this.fileStorage.getStore();

        return this.fileStorage.get(key, defaultValue)
    }

    /**
     * All data
     *
     * @return Config
     */
    public getDefaults(): Config {
        return this.configDefault;
    }
}
