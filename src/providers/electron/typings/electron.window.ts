/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Electron from 'electron';

export interface ElectronWindow extends Window {
    require(module: string): Electron.RendererInterface;
}
