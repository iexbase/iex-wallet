/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@angular/core';


// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import * as Electron from 'electron';
import {ElectronWindow} from "./typings/electron.window";

// Providers
import {Logger} from "@providers/logger/logger";


declare let window: ElectronWindow;

@Injectable()
export class ElectronProvider
{
    private _electron: Electron.RendererInterface;

    /**
     * Object creation ElectronProvider
     *
     * @param logger - Logger
     */
    constructor(
        private logger: Logger
    ) {
        this.logger.debug('ElectronProvider initialized');
    }

    /**
     * determines if SPA is running in Electron
     */
    public get isElectronApp(): boolean {
        return !!window.navigator.userAgent.match(/Electron/);
    }

    public get desktopCapturer(): Electron.DesktopCapturer {
        return this.electron ? this.electron.desktopCapturer : null;
    }

    public get ipcRenderer(): Electron.IpcRenderer {
        return this.electron ? this.electron.ipcRenderer : null;
    }

    public get remote(): Electron.Remote {
        return this.electron ? this.electron.remote : null;
    }

    public readFromClipboard() {
        const { clipboard } = (window as any).require('electron');
        return clipboard.readText();
    }

    public writeToClipboard(text) {
        const { clipboard } = (window as any).require('electron');
        return clipboard.writeText(text);
    }

    public clearClipboard() {
        const { clipboard } = (window as any).require('electron');
        clipboard.clear();
    }

    public openExternalLink(url) {
        const { shell } = (window as any).require('electron');
        return shell.openExternal(url);
    }

    public get webFrame(): Electron.WebFrame {
        return this.electron ? this.electron.webFrame : null;
    }

    public get clipboard(): Electron.Clipboard {
        return this.electron ? this.electron.clipboard : null;
    }

    public get crashReporter(): Electron.CrashReporter {
        return this.electron ? this.electron.crashReporter : null;
    }

    public get process(): NodeJS.Process {
        return this.remote ? this.remote.process : null;
    }

    public get nativeImage(): typeof Electron.nativeImage {
        return this.electron ? this.electron.nativeImage : null;
    }

    public get screen(): Electron.Screen {
        return this.electron ? this.electron.screen : null;
    }

    public get shell(): Electron.Shell {
        return this.electron ? this.electron.shell : null;
    }

    public getLocalPath() {
        const { remote } = (window as  any).require('electron');
        return remote.app.getPath('userData');
    }

    private get electron(): Electron.RendererInterface {
        if (!this._electron) {
            if (window && window.require) {
                this._electron = window.require('electron');
                return this._electron;
            }
            return null;
        }
        return this._electron;
    }
}
