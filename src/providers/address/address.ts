/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from "@angular/core";

// Providers
import {Logger} from '@providers/logger/logger';
import {TronProvider} from '@providers/tron/tron';

// bcrypto plugin
const keccak256 = require('bcrypto/lib/keccak256');
const secp256k1 = require('bcrypto/lib/secp256k1');

// declare buffer
declare const Buffer;

@Injectable()
export class AddressProvider
{
    /**
     * Object creation AddressProvider
     *
     * @param {Logger} logger - Logger provider
     * @param {TronProvider} tronProvider - Tron provider
     */
    constructor(private logger: Logger,
                private tronProvider: TronProvider) {
        this.logger.debug('AddressProvider initialized');
    }

    /**
     * Address validation
     *
     * @param {string} address - Tron address
     * @return boolean
     */
    validateAddress(address: string): boolean {
        return this.tronProvider.isAddress(address);
    }

    /**
     * Convert address to hex
     *
     * @param {string} address - Tron address
     * @return string
     */
    toHex(address: string) {
        return this.tronProvider.addressToHex(address);
    }

    /**
     * from Hex to string
     *
     * @param address - Tron address
     * @return string
     */
    toBase58(address: string) {
        return this.tronProvider.addressFromHex(address);
    }

    /**
     * from Private key to address
     *
     * @param {string} address - Tron address
     * @return string
     */
    fromPrivateKey(address: string) {
        return this.tronProvider.fromPrivateKey(address);
    }

    /**
     * Get the public key of an account using its private key
     *
     * @param {string | Buffer}  privateKey - Private key
     * @returns {string} public key of the account
     */
    static getPubKeyFromPrivateKey(privateKey: string | Buffer): string
    {
        if (typeof privateKey == 'string')
            privateKey = Buffer.from(privateKey, "hex");

        let pubKey:Buffer = secp256k1.publicKeyCreate(privateKey, false);
        return pubKey.toString('hex');
    }

    /**
     * Get the public key of an account using its private key
     *
     * @param {string | Buffer}  privateKey - Private key
     * @returns {string} public key of the account
     */
    static getAddressFromPrivateKey(privateKey: string | Buffer): string
    {
        if (typeof privateKey == 'string')
            privateKey = Buffer.from(privateKey, 'hex');

        // Convert private key to public
        let pubKey:Buffer = secp256k1.publicKeyCreate(privateKey, false);

        // In case the length of the public key exceeds 64 characters,
        // delete the invalid ones.
        if (pubKey.length === 65)
            pubKey = pubKey.slice(1);

        let hash = keccak256.digest(pubKey).toString('hex');
        return '41' + hash.substring(24)
    }

    /**
     * Validate private key
     *
     * @param {string, Buffer} privateKey - Private key
     * @return boolean
     */
    static validatePrivateKey(privateKey: string | Buffer): boolean
    {
        if (typeof privateKey == 'string')
            privateKey = Buffer.from(privateKey, 'hex');
        return secp256k1.privateKeyVerify(privateKey);
    }
}
