var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from "@angular/core";
// Advanced Packages
import { LocalStorage } from "ngx-webstorage";
import { Store } from "@ngrx/store";
import { secp256k1 } from "bcrypto";
import * as bip39 from 'bip39';
import * as hdkey from 'hdkey';
import * as lodash from 'lodash';
import * as CryptoJS from "crypto-js";
// Import from app ngrx
import * as WalletActions from "@redux/wallet/wallet.actions";
// Providers
import { AddressProvider } from '@providers/address/address';
import { TronProvider } from '@providers/tron/tron';
import { Logger } from '@providers/logger/logger';
// utils
import { isHex } from "@utils/bytes";
import env from "../../environments";
// List Coins (Standard TRON)
export var Coin;
(function (Coin) {
    Coin["TRX"] = "TRX";
})(Coin || (Coin = {}));
var WalletProvider = /** @class */ (function () {
    /**
     * Object creation WalletProvider
     *
     * @param {Logger} logger - Logger
     * @param {AddressProvider} addressProvider - Address provider
     * @param {Store} store - Reactive store
     * @param {TronProvider} tron - Tron provider
     */
    function WalletProvider(logger, addressProvider, store, tron) {
        this.logger = logger;
        this.addressProvider = addressProvider;
        this.store = store;
        this.tron = tron;
        /**
         * Number of attempts to log in
         *
         * @var number
         */
        this.countAttempted = 0;
        /**
         * Bandwidth selected account
         *
         * @var number
         */
        this.bandwidth = 0;
        /**
         * Energy selected account
         *
         * @var number
         */
        this.energy = 0;
        /**
         * Balance selected account
         *
         * @var number
         */
        this.balance = 0;
        /**
         * Credentials Last Update Time
         *
         * @var number
         */
        this.lastUpdated = Date.now();
        this.logger.debug('WalletProvider initialized');
    }
    WalletProvider_1 = WalletProvider;
    /**
     * Import an account wallet from server using a private key
     *
     * @param {string} privateKey - the private key of the account being imported
     * @returns {Promise} Promise object containing details - if imported successfully or not
     */
    WalletProvider.prototype.importWallet = function (privateKey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.info('Importing Wallet PrivateKey');
            if (!!privateKey.match(/[0-9a-fA-F]{64}/) == false)
                reject('Invalid private key');
            // check if private key valid
            try {
                if (AddressProvider.validatePrivateKey(privateKey)) {
                    var addr_1 = _this.addressProvider.fromPrivateKey(privateKey);
                    _this.getBalance(addr_1).then(function (balance) {
                        resolve({
                            balance: balance,
                            privateKey: privateKey,
                            publicKey: AddressProvider.getPubKeyFromPrivateKey(privateKey),
                            address: {
                                base58: addr_1,
                                hex: AddressProvider.getAddressFromPrivateKey(privateKey)
                            }
                        });
                    });
                }
                else {
                    reject('Invalid private key.');
                    _this.logger.error('Invalid private key.');
                }
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Generate a new public-private key-pair
     *
     * @returns {CreateWalletInterface} details
     */
    WalletProvider.prototype.createWallet = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var privateKey = secp256k1.generatePrivateKey();
                if (!privateKey)
                    reject('Error creating private key');
                var hexAddress = AddressProvider.getAddressFromPrivateKey(privateKey);
                resolve({
                    balance: 0,
                    privateKey: privateKey,
                    publicKey: AddressProvider.getPubKeyFromPrivateKey(privateKey),
                    address: {
                        base58: _this.addressProvider.toBase58(hexAddress),
                        hex: hexAddress
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Decryption data storage
     *
     * @return any[]
     */
    WalletProvider.prototype.listWallets = function () {
        var wallets = this.decryptWallet(this.password) || [];
        // Verify password entry
        if (wallets == null && wallets == undefined)
            throw new Error('Invalid password');
        return wallets;
    };
    /**
     * Wallet check at
     *
     * @param {string} walletAddress - Tron address
     * @return boolean
     */
    WalletProvider.prototype.hasWallet = function (walletAddress) {
        return this.listWallets().some(function (filter) { return filter.address === walletAddress; });
    };
    /**
     * addByPrivateKey
     *
     * Adds an account to the wallet by private key.
     *
     * @param {string} privateKey - hex-encoded private key
     * @returns {string} - the corresponing address, computer from the private key.
     */
    WalletProvider.prototype.addByPrivateKey = function (privateKey) {
        var publicKey = AddressProvider.getPubKeyFromPrivateKey(privateKey);
        var address = AddressProvider.getAddressFromPrivateKey(privateKey);
        return {
            publicKey: publicKey,
            address: {
                base58: this.addressProvider.toBase58(address),
                hex: address
            },
            privateKey: privateKey
        };
    };
    /**
     * addWallet
     *
     * Add a new account to the list where all saved accounts are located
     *
     * @param {WalletOptions} wallet - Details wallet
     * @return void
     */
    WalletProvider.prototype.addWallet = function (wallet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var allWallets = _this.listWallets();
            if (_this.hasWallet(wallet.address)) {
                _this.logger.error("Already added: Wallet " + wallet.address);
                return reject('Account already added');
            }
            var time = new Date().getTime();
            var newWallet = __assign({ id: Object.keys(_this.listWallets()).length + 1, position: Object.keys(_this.listWallets()).length + 1, coin: Coin.TRX, balance: 0, createdOn: Math.round(time / 1000), updatedOn: Math.round(time / 1000), hideBalance: false, color: 'theme-wallet-thunderbird', testNet: false }, wallet);
            allWallets.push(newWallet);
            // Updating data in the repository
            _this.encryptWallet(allWallets, _this.password);
            resolve(newWallet);
        });
    };
    /**
     * Retrieving wallet information at address (Not Private key)
     *
     * @param {string} walletAddress - TRON address
     * @return any
     */
    WalletProvider.prototype.getWallet = function (walletAddress) {
        this.logger.debug("Get Wallet ID " + walletAddress);
        var wallets = this.listWallets().find(function (c) { return c.address == walletAddress; });
        // Remove private key from the list
        delete wallets['privateKey'];
        return wallets;
    };
    /**
     * Details of the wallet to the address with the included private key
     *
     * @param {string} walletAddress - TRON address
     * @return any
     */
    WalletProvider.prototype.getWalletAndPrivateKey = function (walletAddress) {
        this.logger.debug("Get Wallet ID " + walletAddress + " with private key");
        try {
            return this.listWallets().find(function (c) { return c.address == walletAddress; });
        }
        catch (e) {
            throw new Error("Invalid wallet ID " + walletAddress);
        }
    };
    /**
     * updateWallet
     *
     * Update account details by address
     *
     * @param {string} walletAddress - TRON Address
     * @param {UpdateWalletModel} options - Parameters for update
     *
     * @return Promise
     */
    WalletProvider.prototype.updateWallet = function (walletAddress, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // We do not allow the possibility of changing important parameters.
            // If these parameters change, the account will be disrupted.
            if (options['createdOn'] || options['privateKey'] || options['address'] || options['id']) {
                return reject('Something went wrong');
            }
            try {
                _this.logger.debug("Update Wallet ID " + walletAddress);
                // Data update wallet ID
                var updateWalletId = _this.listWallets().map(function (c) {
                    if (c.address != walletAddress)
                        return c;
                    else {
                        return __assign({}, c, options);
                    }
                });
                // Update the purse store and make new changes
                _this.encryptWallet(updateWalletId, _this.password);
                return resolve(_this.getWallet(walletAddress));
            }
            catch (e) {
                return reject(e);
            }
        });
    };
    /**
     * deleteWallet
     *
     * Complete account deletion
     *
     * @param {string} walletAddress - TRON Address
     * @return: void
     */
    WalletProvider.prototype.deleteWallet = function (walletAddress) {
        // To begin to check whether the exists selected wallet
        if (!this.hasWallet(walletAddress))
            throw new Error('account not found');
        this.logger.info('Deleting Wallet:', walletAddress);
        // Exclude from the list the purse to be deleted
        var updatedWallet = this.listWallets().filter(function (filter) { return filter.address != walletAddress; });
        // Update the purse store and make new changes
        this.encryptWallet(updatedWallet, this.password);
    };
    /**
     * isWallet
     *
     * Check if data exists in the repository
     *
     * @return boolean
     */
    WalletProvider.prototype.isWallet = function () {
        return (this.hashPassword != null);
    };
    /**
     * getWallets
     *
     * Get a list of wallets
     *
     * @param {string} address - TRON address (no required)
     * @return any | string
     */
    WalletProvider.prototype.getWallets = function (address) {
        if (address) {
            try {
                var walletID = this.listWallets().find(function (f) { return f.address === address; });
                // We do not allow the conclusion of a private key
                delete walletID['privateKey'];
                return walletID;
            }
            catch (e) {
                throw new Error(e);
            }
        }
        // An array of wallets without a private key
        return this.listWallets()
            .filter(function (filter) { return delete filter['privateKey']; });
    };
    /**
     * encryptWallet
     *
     * Encrypt the wallet with all the data
     *
     * @param {any} wallet - wallets data
     * @param {string} password - Password
     * @return void
     */
    WalletProvider.prototype.encryptWallet = function (wallet, password) {
        try {
            this.wallet = CryptoJS.AES.encrypt(JSON.stringify(wallet), password).toString();
        }
        catch (e) {
            throw new Error(e);
        }
    };
    /**
     * decryptWallet
     *
     * Decrypt the repository and get all the data
     *
     * @param {string} password - Password
     * @return any
     */
    WalletProvider.prototype.decryptWallet = function (password) {
        // If there is no data, create an empty array
        if (this.wallet == null)
            this.encryptWallet([], password);
        try {
            var wallet = CryptoJS.AES.decrypt(this.wallet, password).toString(CryptoJS.enc.Utf8);
            return JSON.parse(wallet) || [];
        }
        catch (e) {
            throw new Error(e);
        }
    };
    /**
     * createTx
     *
     * Create a new transaction
     *
     * @param {TransactionProposal} txp - the details of the transaction
     * @param {TransactionProposal} txp.toAddress - address to which transaction is sent to
     * @param {TransactionProposal} txp.amount - number of sun sent
     * @param {string} accountAddress - Sender's address
     * @returns {Promise} Promise object containing the newly created transaction id
     */
    WalletProvider.prototype.createTx = function (txp, accountAddress) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Checking important parameters
            if (lodash.isEmpty(txp))
                return reject('MISSING_PARAMETER');
            _this.tron.createTxProposal(txp.toAddress, txp.amount, txp.tokenID, accountAddress, function (err, createdTxp) {
                if (err)
                    return reject(err);
                else {
                    _this.logger.debug('Transaction created');
                    return resolve(createdTxp);
                }
            });
        });
    };
    /**
     * signTx
     *
     * Signs a provided transaction object.
     *
     * @param {any} transaction - Transaction not signed
     * @return {Promise} - Signed transaction
     */
    WalletProvider.prototype.signTx = function (transaction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // We check the received parameters before signing
            if (!_this.activeAccount || !transaction)
                reject('MISSING_PARAMETER');
            // Validation of the private key (For additional confidence)
            if (!AddressProvider.validatePrivateKey(_this.getPrivateKey()))
                reject('Invalid private key');
            // If the main parameters are verified successfully,
            // then proceed to signing the transaction.
            try {
                _this.tron.signTxProposal(transaction, _this.getPrivateKey(), function (err, signedTxp) {
                    if (err) {
                        _this.logger.error('Transaction signed err: ', err);
                        reject(err);
                    }
                    resolve(signedTxp);
                });
            }
            catch (e) {
                _this.logger.error('Error at signTxProposal:', e);
                reject(e);
            }
        });
    };
    /**
     * broadcastTx
     *
     * Sending a transaction to the network
     *
     * @param {any} transaction - Transaction details (with signature)
     * @return {Promise} - If successful that "result: true"
     */
    WalletProvider.prototype.broadcastTx = function (transaction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Check whether transactions are signed
            if (!transaction.signature)
                reject('Transaction not signed');
            // If there are no serious problems, send the transaction to the network
            _this.tron.broadcastTxProposal(transaction, {}, function (err, broadcastedTxp) {
                // If you have problems sending a transaction
                if (err) {
                    return reject(err);
                }
                _this.logger.info('Transaction broadcasted');
                return resolve(broadcastedTxp);
            });
        });
        // return new Promise((resolve, reject) => {
        //     if (lodash.isEmpty(txp))
        //         return reject('MISSING_PARAMETER');
        //
        //     this.tronWeb.trx.sendRawTransaction(txp, {}, (err, broadcastedTxp) => {
        //         if (err) {
        //             return reject(err);
        //         }
        //         this.logger.info('Transaction broadcasted');
        //         return resolve(broadcastedTxp);
        //     });
        // });
    };
    /**
     * verifySignature
     *
     * With the original message text and a signature:
     *
     * @param {VerifySignatureProposal} options - Parameters for verification
     * @param {VerifySignatureProposal} options.message - Original message
     * @param {VerifySignatureProposal} options.signature - Hash signature
     * @param {VerifySignatureProposal} options.address - Tron address
     * @return Promise
     */
    WalletProvider.prototype.verifySignature = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Before the main checks, we affirm that the signature
            // complies with the rules
            if (!isHex(options.signature))
                reject('Invalid signature');
            try {
                _this.tron.verifyMessage(options.message, options.signature, options.address, function (err, verifySig) {
                    // If you have problems checking
                    if (err) {
                        _this.logger.error('Message verify err: ', err);
                        reject(err);
                    }
                    resolve(verifySig);
                });
            }
            catch (e) {
                _this.logger.error('Error at message Verify:', e);
                reject(e);
            }
        });
    };
    /**
     * getBalance
     *
     * Getting the actual balance from the node
     *
     * @param {string} account - TRON Address (Recommend base58)
     * @return {Promise} - In case of luck, we get the balance in "number"
     */
    WalletProvider.prototype.getBalance = function (account) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Convert to base58
            account = _this.addressProvider.toBase58(account);
            // Send a request to the node to get the current balance
            _this.tron.getBalance(account, function (err, balanceAddr) {
                // If you're having trouble checking your balance
                if (err)
                    reject(err);
                resolve(balanceAddr);
            });
        });
    };
    /**
     * getAccount
     *
     * Retrieving Account Details
     *
     * @param {string} account - TRON Address
     * @return {Promise} - return account information
     */
    WalletProvider.prototype.getAccount = function (account) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Convert to base58
            account = _this.addressProvider.toBase58(account);
            _this.tron.getAccount(account, function (err, addrInfo) {
                // If you're having trouble checking your account
                if (err)
                    reject(err);
                resolve(addrInfo);
            });
        });
    };
    /**
     * getAccountResources
     *
     * Gets the account's bandwidth and energy resources.
     *
     * @param {string} account - TRON Address
     * @return {Promise} - return account's bandwidth and energy resources.
     */
    WalletProvider.prototype.getAccountResources = function (account) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Convert to base58
            account = _this.addressProvider.toBase58(account);
            _this.tron.getAccountResources(account, function (err, resourceAddr) {
                // If you're having trouble checking your account resources
                if (err)
                    reject(err);
                resolve(resourceAddr);
            });
        });
    };
    /**
     * getBandwidth
     *
     * Receiving bandwidth account
     *
     * @param {string} account - TRON Address
     * @return {Promise} - return account's bandwidth
     */
    WalletProvider.prototype.getBandwidth = function (account) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.tron.getBandwidth(account, function (err, bandWidthAddr) {
                // If you're having trouble checking your account bandwidth
                if (err)
                    reject(err);
                resolve(bandWidthAddr);
            });
        });
    };
    /**
     * prepare
     *
     * Before receiving data, you must pass authorization
     *
     * @param {string} password - Auth password
     * @return {Promise} - return hash password
     */
    WalletProvider.prototype.prepare = function (password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var wallet = CryptoJS.AES.decrypt(_this.wallet, password).toString(CryptoJS.enc.Utf8);
                // If the storage is empty, we return an error
                if (wallet == '')
                    reject('PASSWORD_CANCELLED');
                resolve(password);
            }
            catch (e) {
                return reject(new Error('WRONG_PASSWORD'));
            }
        });
    };
    /**
     * encryptPassword
     *
     * For added security, encrypt the password when registering a wallet
     */
    WalletProvider.encryptPassword = function (password) {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    };
    /**
     * createPassword
     *
     *  Create and write password hash in local storage
     *
     *  @param {string} password - user password
     *  @return {Promise} - If everything successfully returns the password hash
     */
    WalletProvider.prototype.createPassword = function (password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.hashPassword) {
                _this.hashPassword = WalletProvider_1.encryptPassword(password);
                _this.encryptWallet([], _this.hashPassword);
                _this._password = _this.hashPassword;
                return resolve({
                    'result': true
                });
            }
            reject('Password has already been created');
        });
    };
    /**
     * hasPassword
     *
     * Verification of passwords to log into the account
     *
     * @param {string} password - password
     */
    WalletProvider.prototype.hasPassword = function (password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // If no password is specified
            if (password && password.length < 1)
                return reject('Password not specified');
            // Blocking due to multiple authorizations
            // Useful feature for security at the entrance
            if (_this.unlockTime && _this.unlockTime != 0) {
                var endDate = new Date(_this.unlockTime);
                var minutes = new Date((endDate.getTime() - new Date().getTime())).getMinutes();
                // If the lock time exceeds the current time,
                // then remove the lock
                if (new Date().getTime() > new Date(_this.unlockTime).getTime()) {
                    _this.unlockTime = 0;
                    return _this.countAttempted = 0;
                }
                return reject("Too many login attempts. Please try again in " + minutes + " minutes.");
            }
            // If the number of non-daily attempts exceeds the set,
            // temporarily block the authorization
            // Note: The number of unsuccessful attempts must be greater than 2.
            if (_this.countAttempted > (env.login.failedLogin < 2 ? 5 : env.login.failedLogin)) {
                if (_this.unlockTime == null || _this.unlockTime == 0) {
                    var ex = new Date(Date.now());
                    ex.setMinutes(ex.getMinutes() + env.login.lockedMinutes);
                    _this.unlockTime = Math.floor(ex.getTime());
                }
                return reject('Too many failed attempts, repeat later.');
            }
            // If the passwords do not match
            if (WalletProvider_1.encryptPassword(password) != _this.hashPassword) {
                _this.countAttempted++; // Authorization Attempt Counter
                return reject('Invalid password');
            }
            _this._password = WalletProvider_1.encryptPassword(password);
            resolve({
                result: true,
                hash: _this.password
            });
        });
    };
    /**
     * getPrivateKey
     *
     * Getting the private key of the selected account
     *
     * @return {Buffer} - return buffer private key
     */
    WalletProvider.prototype.getPrivateKey = function () {
        var _this = this;
        // If there are no active wallets, we return an error
        if (!this.activeAccount)
            throw new Error('Invalid selected account');
        try {
            var privateKey = this.listWallets().find(function (f) { return f.address == _this.activeAccount; });
            return Buffer.from(privateKey['privateKey'], 'hex');
        }
        catch (e) {
            throw new Error(e);
        }
    };
    Object.defineProperty(WalletProvider.prototype, "password", {
        /**
         * getPassword
         *
         * Get the password you entered
         *
         * @return string
         */
        get: function () {
            return this._password;
        },
        /**
         * setPassword
         *
         * Write the entered password to the variable.
         *
         * @param {string} val - Password
         */
        set: function (val) {
            this._password = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * getTxsFromServer
     *
     * Returns all transactions for the specified account.
     *
     * @param {TransactionProposal} options - Option params
     * @param {TransactionProposal} options.address - Tron Address.
     * @param {TransactionProposal} options.limit - Limit the number of returned tx.
     * @param {TransactionProposal} options.start - Start to return from.
     * @param {TransactionProposal} options.total - Total Tx.
     * @param {TransactionProposal} options.endingTxID - Closing txID
     * @return {Promise} return transactions
     */
    WalletProvider.prototype.getTxsFromServer = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var res = [];
            var result = {
                res: res,
                total: 0,
                shouldContinue: res.length || 0 >= options.limit
            };
            _this.tron.getTxHistory(options.address, options.start, options.limit, options.total, function (err, historyTx) {
                // In case of problems, we don’t continue
                if (err)
                    return reject(err);
                // If you received an empty response from the server, do not continue
                if (lodash.isEmpty(historyTx['data']))
                    return resolve(result);
                //Returns all transactions to the address, if the "endingTxID" is filled in,
                // in this case, we will not receive data beyond this id
                res = lodash.takeWhile(historyTx['data'], function (tx) {
                    return tx.hash != options.endingTxID;
                });
                result.res = res;
                result.total = historyTx.total;
                result.shouldContinue = res.length >= options.limit;
                return resolve(result);
            });
        });
    };
    /**
     * getTx
     *
     * Gets a transaction by transaction ID.
     *
     * @param {string} txHash - Transaction ID
     * @return {Promise} - transaction into
     */
    WalletProvider.prototype.getTx = function (txHash) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.tron.getTransaction(txHash, function (err, txHistory) {
                // If errors occur, do not skip any further.
                if (err)
                    return reject(err);
                // If "hash" is empty, then we consider it as an error
                if (lodash.isEmpty(txHistory['hash']))
                    return reject('Could not get transaction');
                resolve(txHistory);
            });
        });
    };
    /**
     * addByMnemonic
     *
     * Adds an `Account` by use of a mnemonic as specified in BIP-32 and BIP-39
     *
     * @param {string} phrase - 12-word mnemonic phrase
     * @param {number} index=0 - the number of the child key to add
     * @returns {string} - the corresponding address
     */
    WalletProvider.prototype.addByMnemonic = function (phrase, index) {
        if (index === void 0) { index = 0; }
        if (!WalletProvider_1.isValidMnemonic(phrase))
            throw new Error("Invalid mnemonic phrase: " + phrase);
        var seed = bip39.mnemonicToSeed(phrase);
        var hdKey = hdkey.fromMasterSeed(seed);
        var childKey = hdKey.derive("m/44'/195'/" + index + "'/0/0");
        var privateKey = childKey.privateKey.toString('hex');
        return this.addByPrivateKey(privateKey);
    };
    /**
     * Validation Mnemonic
     *
     * @param {string} phrase - Phrase 12 worlds
     * @return boolean
     * */
    WalletProvider.isValidMnemonic = function (phrase) {
        if (phrase.trim().split(/\s+/g).length < 12) {
            return false;
        }
        return bip39.validateMnemonic(phrase);
    };
    /**
     * updateAccount
     *
     * Account Master Data Update
     *
     * @param {string} account - Tron Address
     * @return void
     */
    WalletProvider.prototype.updateAccount = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBandwidth(account).then(function (bandwidth) {
                            _this.bandwidth = bandwidth;
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getAccountResources(account).then(function (resources) {
                                _this.energy = resources['EnergyLimit'];
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * fullUpdateAccount
     *
     * Full account data update
     *
     * @param {string} walletAddress - Tron Address
     * @return void
     */
    WalletProvider.prototype.fullUpdateAccount = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Update bandwidth and energy
                    return [4 /*yield*/, this.updateAccount(walletAddress)];
                    case 1:
                        // Update bandwidth and energy
                        _a.sent();
                        // Update account balance
                        return [4 /*yield*/, this.getBalance(walletAddress).then(function (balance) {
                                _this.balance = balance;
                                // Fix the update date
                                _this.lastUpdated = Date.now();
                                _this.updateWallet(walletAddress, {
                                    balance: _this.balance,
                                    bandwidth: _this.bandwidth,
                                    energyLimit: _this.energy,
                                    lastUpdated: _this.lastUpdated
                                }).then(function (resultUpdate) {
                                    var update = {
                                        id: resultUpdate.id,
                                        changes: {
                                            balance: resultUpdate.balance,
                                            bandwidth: resultUpdate.bandwidth,
                                            energyLimit: resultUpdate.energyLimit,
                                            lastUpdated: resultUpdate.lastUpdated
                                        }
                                    };
                                    _this.store.dispatch(new WalletActions.UpdateWallet({ wallet: update }));
                                });
                            })];
                    case 2:
                        // Update account balance
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var WalletProvider_1;
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], WalletProvider.prototype, "wallet", void 0);
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], WalletProvider.prototype, "activeAccount", void 0);
    __decorate([
        LocalStorage(),
        __metadata("design:type", String)
    ], WalletProvider.prototype, "hashPassword", void 0);
    __decorate([
        LocalStorage(),
        __metadata("design:type", Number)
    ], WalletProvider.prototype, "unlockTime", void 0);
    WalletProvider = WalletProvider_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Logger,
            AddressProvider,
            Store,
            TronProvider])
    ], WalletProvider);
    return WalletProvider;
}());
export { WalletProvider };
//# sourceMappingURL=wallet.js.map