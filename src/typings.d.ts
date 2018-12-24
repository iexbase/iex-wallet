/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/// <reference types="node" />

declare var nodeModule: NodeModule;
interface NodeModule {
    id: string;
}

declare var window: Window;
interface Window {
    process: any;
    require: any;
}

declare module '*.json' {
    const value: any;
    export default value;
}
declare module 'bcrypto';
declare module 'hdkey';
