/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// config
import env from "./environments";
import { AppModule } from "./app/app.module";

if (env.name == 'production') {
    enableProdMode();
} else {
    // Remove the security warnings about Content policy - not imposing security issues for our project anyways.
    window['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
