/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, isDevMode;
const args = process.argv.slice(1);
isDevMode = args.some(val => val === '--serve');


const appConfig = require(path.join(
    __dirname,
    '/dist/assets/appConfig.json'
));

console.log('Desktop: ' + appConfig.nameCase + ' v' + appConfig.version);


function createWindow() {
    // Get screen size
    const size = screen.getPrimaryDisplay().workAreaSize;

    // Distribute screen sizes for production
    // and for developer mode.
    const browser: any = (isDevMode ? {
        width: size.width,
        height: size.height
    } : {
        width: 1064,
        height: 650
    });

    // Create the browser window.
    win = new BrowserWindow({
        ...browser,
        minWidth: 1064,
        minHeight: 650,
        center: true
    });

    if (isDevMode) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });
        win.loadURL('http://localhost:4200');
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    // hide toolbar menu
    win.setMenu(null);

    // Open the DevTools.
    if (isDevMode) {
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}


try {

    app.setAsDefaultProtocolClient('tron');
    app.setAsDefaultProtocolClient(appConfig.name);
    app.setName(appConfig.nameCase);

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
} catch (e) {
    // Catch Error
    // throw e;
}
