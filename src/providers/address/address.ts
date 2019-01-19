/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Injectable} from '@angular/core';
// Providers
import {Logger} from '@providers/logger/logger';
import {TronProvider} from '@providers/tron/tron';
import {ec} from 'elliptic';

// ec plugin
const secp256k1: any = new ec('secp256k1');
const keccak256 = require('js-sha3').keccak256;

// declare buffer
declare const Buffer;

@Injectable()
export class AddressProvider {
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
     * Get the public key of an account using its private key
     *
     * @param {string | Buffer}  privateKey - Private key
     * @returns {string} public key of the account
     */
    static getPubKeyFromPrivateKey(privateKey: string | Buffer): string {
        if (typeof privateKey == 'string') {
            privateKey = Buffer.from(privateKey, 'hex');
        }

        const keyPair = secp256k1.keyFromPrivate(privateKey, 'hex');
        return keyPair.getPublic('hex');
    }

    /**
     * Get the public key of an account using its private key
     *
     * @param {string | Buffer}  privateKey - Private key
     * @returns {string} public key of the account
     */
    static getAddressFromPrivateKey(privateKey: string | Buffer): string {
        if (typeof privateKey == 'string') {
            privateKey = Buffer.from(privateKey, 'hex');
        }

        const keyPair = secp256k1.keyFromPrivate(privateKey, 'hex');
        // Convert private key to public
        const publicKey = keyPair.getPublic().encode('hex').slice(2);

        // Now apply keccak
        const address = keccak256(
            Buffer.from(publicKey, 'hex')
        ).slice(64 - 40);
        return `41${address.toString()}`;
    }


    /**
     * compressPublicKey
     *
     * @param {string | Buffer} publicKey - 65-byte public key, a point (x, y)
     * @returns {string}
     */
    static compressPublicKey(publicKey: string | Buffer): string {
        if (typeof publicKey == 'string') {
            publicKey = Buffer.from(publicKey, 'hex');
        }


        return secp256k1.keyFromPublic(publicKey, 'hex')
            .getPublic(true, 'hex');
    }

    /**
     * Validate private key
     *
     * @param {string, Buffer} privateKey - Private key
     * @return boolean
     */
    static validatePrivateKey(privateKey: string | Buffer): boolean {
        if (typeof privateKey == 'string') {
            privateKey = Buffer.from(privateKey, 'hex');
        }

        const keyPair = secp256k1.keyFromPrivate(privateKey, 'hex');
        const { result } = keyPair.validate();
        return result;
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
     * generatePrivateKey
     *
     * Generating a new private key
     *
     * @returns {any}
     */
    generatePrivateKey(): any {
        const genPair = secp256k1.genKeyPair();
        const hexAddress = AddressProvider.getAddressFromPrivateKey(
            genPair.getPrivate('hex')
        );

        return {
            privateKey: genPair.getPrivate('hex'),
            publicKey: genPair.getPublic('hex'),
            address: {
                hex: hexAddress,
                base58: this.toBase58(hexAddress)
            }
        };
    }

    /**
     * Remove unnecessary values
     *
     * @param {string} str - address
     * @returns {string}
     */
    extractAddress(str: string): string {
        return str.replace(/^(tron:)/i, '')
            .replace(/\?.*/, '');
    }
}
