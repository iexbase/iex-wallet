var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
// Providers
import { Logger } from '@providers/logger/logger';
import { TronProvider } from '@providers/tron/tron';
var keccak256 = require('bcrypto/lib/keccak256');
var secp256k1 = require('bcrypto/lib/secp256k1');
var AddressProvider = /** @class */ (function () {
    /**
     * Object creation AddressProvider
     *
     * @param logger - Logger
     * @param tron - Tron Web provider
     */
    function AddressProvider(logger, tronProvider) {
        this.logger = logger;
        this.tronProvider = tronProvider;
        this.logger.debug('AddressProvider initialized');
    }
    /**
     * Address validation
     *
     * @param address - Tron address
     * @return boolean
     */
    AddressProvider.prototype.validateAddress = function (address) {
        return this.tronProvider.isAddress(address);
    };
    /**
     * Convert address to hex
     *
     * @param address - Tron address
     * @return string
     */
    AddressProvider.prototype.toHex = function (address) {
        return this.tronProvider.addressToHex(address);
    };
    /**
     * from Hex to string
     *
     * @param address - Tron address
     * @return string
     */
    AddressProvider.prototype.toBase58 = function (address) {
        return this.tronProvider.addressFromHex(address);
    };
    /**
     * from Private key to address
     *
     * @param address - Tron address
     * @return string
     */
    AddressProvider.prototype.fromPrivateKey = function (address) {
        return this.tronProvider.fromPrivateKey(address);
    };
    /**
     * Get the public key of an account using its private key
     *
     * @param {string | Buffer}  privateKey - Private key
     * @returns {string} public key of the account
     */
    AddressProvider.getPubKeyFromPrivateKey = function (privateKey) {
        if (typeof privateKey == 'string')
            privateKey = Buffer.from(privateKey, "hex");
        var pubKey = secp256k1.publicKeyCreate(privateKey, false);
        return pubKey.toString('hex');
    };
    /**
     * Get the public key of an account using its private key
     *
     * @param {string | Buffer}  privateKey - Private key
     * @returns {string} public key of the account
     */
    AddressProvider.getAddressFromPrivateKey = function (privateKey) {
        if (typeof privateKey == 'string')
            privateKey = Buffer.from(privateKey, 'hex');
        // Convert private key to public
        var pubKey = secp256k1.publicKeyCreate(privateKey, false);
        // In case the length of the public key exceeds 64 characters,
        // delete the invalid ones.
        if (pubKey.length === 65)
            pubKey = pubKey.slice(1);
        var hash = keccak256.digest(pubKey).toString('hex');
        return '41' + hash.substring(24);
    };
    /**
     * Validate private key
     *
     * @param {string, Buffer} privateKey - Private key
     * @return boolean
     */
    AddressProvider.validatePrivateKey = function (privateKey) {
        if (typeof privateKey == 'string')
            privateKey = Buffer.from(privateKey, 'hex');
        return secp256k1.privateKeyVerify(privateKey);
    };
    AddressProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Logger,
            TronProvider])
    ], AddressProvider);
    return AddressProvider;
}());
export { AddressProvider };
//# sourceMappingURL=address.js.map