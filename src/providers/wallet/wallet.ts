/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import { Injectable } from "@angular/core";

// Advanced Packages
import { LocalStorage } from "ngx-webstorage";
import { Store } from "@ngrx/store";

import { Update } from "@ngrx/entity";
import bip39 from 'bip39';
import hdkey from 'hdkey';
import * as _ from 'lodash';
import * as CryptoJS from "crypto-js";

// Import from app ngrx
import * as WalletActions from "@redux/wallet/wallet.actions";

// Providers
import { AddressProvider } from '@providers/address/address';
import { TronProvider } from '@providers/tron/tron';
import { Logger } from '@providers/logger/logger';

// utils
import {isHex} from "@utils/bytes";
import {AppState} from "@redux/index";
import env from "../../environments";

// List Coins (Standard TRON)
export enum Coin {
    TRX = 'TRX'
}

// Declare Buffer plugin
declare const Buffer: any;

// Interface Verify message
export interface VerifySignatureProposal {
    message: string;
    signature: string;
    address: string;
}

// Interface options transaction history
export interface TrxHistoryProposal {
    address: string;
    endingTxID?: string;
    start: number;
    limit: number;
    total: number;
}

// Interface Create new wallet
export interface CreateWalletInterface
{
    balance?: number;
    privateKey: string;
    publicKey: string;
    address: {
        base58: string;
        hex: string;
    }
}

// Interface Storage wallet ID
export interface WalletOptions
{
    id?: number;
    position?: number;
    name: string;
    coin?: Coin;
    balance?: number;
    address: string;
    privateKey: string;
    publicKey?: string;
    color?: string;
    hideBalance?: boolean;
    createdOn?: number;
    updatedOn?: number;

    bandwidth?: number;
    energyLimit?: number;
    tronPower?: number;
    lastUpdated?: number;
    tokens?: any;

    isTestnet?: boolean;
}

// Interface Update wallet ID data
export interface UpdateWalletModel
{
    name?: string;
    balance?: number;
    color?: string;
    hideBalance?: boolean;
    updatedOn?: number;

    bandwidth?: number;
    energyLimit?: number;
    tronPower?: number;
    lastUpdated?: number;
    tokens?: any;

    isTestnet?: boolean;
}

// Interface create new transaction
export interface TransactionProposal {
    amount: any;
    toAddress: string;
    tokenID: string;
    message ?: string;
}


@Injectable()
export class WalletProvider
{
    /**
     * Storage where all accounts are located (Data is encrypted)
     *
     * @var string
     */
    @LocalStorage()
    private wallet: string;

    /**
     * Selected account
     *
     * @var string
     */
    @LocalStorage()
    private readonly activeAccount: string;

    /**
     * Password hash
     *
     * @var string
     */
    @LocalStorage()
    private hashPassword: string;

    /**
     * Number of attempts to log in
     *
     * @var number
     */
    private countAttempted: number = 0;

    /**
     * Lock time
     *
     * @var number
     */
    @LocalStorage()
    private unlockTime: number;

    /**
     * Encrypted vault password
     *
     * @var string
     */
    private _password: string;

    /**
     * Bandwidth selected account
     *
     * @var number
     */
    bandwidth: number = 0;

    /**
     * Energy selected account
     *
     * @var number
     */
    energy: number = 0;

    /**
     * Balance selected account
     *
     * @var number
     */
    balance: any = 0;

    /**
     * Credentials Last Update Time
     *
     * @var number
     */
    lastUpdated: number = Date.now();

    /**
     * Object creation WalletProvider
     *
     * @param {Logger} logger - Logger
     * @param {AddressProvider} addressProvider - Address provider
     * @param {Store} store - Reactive store
     * @param {TronProvider} tron - Tron provider
     */
    constructor(
        private logger: Logger,
        private addressProvider: AddressProvider,
        protected store: Store<AppState>,
        private tron: TronProvider)
    {
        this.logger.debug('WalletProvider initialized');
    }

    /**
     * Import an account wallet from server using a private key
     *
     * @param {string} privateKey - the private key of the account being imported
     * @returns {Promise} Promise object containing details - if imported successfully or not
     */
    importWallet(privateKey: string): Promise<CreateWalletInterface>
    {
        return new Promise((resolve, reject) => {
            this.logger.info('Importing Wallet PrivateKey');

            if(!!privateKey.match(/[0-9a-fA-F]{64}/) == false)
                reject('Invalid private key');

            // check if private key valid
            try
            {
                if (AddressProvider.validatePrivateKey(privateKey))
                {
                    let addr = this.addressProvider.fromPrivateKey(privateKey);
                    this.getBalance(addr).then(balance => {
                        resolve({
                            balance: balance,
                            privateKey: privateKey,
                            publicKey: AddressProvider.getPubKeyFromPrivateKey(privateKey),
                            address: {
                                base58: addr,
                                hex: AddressProvider.getAddressFromPrivateKey(privateKey)
                            }
                        })
                    });
                } else {
                    reject('Invalid private key.');
                    this.logger.error('Invalid private key.')
                }
            }catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Generate a new public-private key-pair
     *
     * @returns {CreateWalletInterface} details
     */
    createWallet(): Promise<CreateWalletInterface>
    {
        return new Promise((resolve, reject) => {
           try {
               let walletDetails = this.addressProvider.generatePrivateKey();
               if(!walletDetails) reject('Error creating private key');

               resolve({
                   balance: 0,
                   ...walletDetails
               })
           }catch (e) {
                reject(e)
           }
        });
    }

    /**
     * Decryption data storage
     *
     * @return any[]
     */
    listWallets(): any[]
    {
        let wallets = this.decryptWallet(this.password) || [];
        // Verify password entry
        if (wallets == null && wallets == undefined)
            throw new Error('Invalid password');
        return wallets;
    }

    /**
     * Wallet check at
     *
     * @param {string} walletAddress - Tron address
     * @return boolean
     */
    hasWallet(walletAddress: string): boolean
    {
        return this.listWallets().some(
            filter => filter.address === walletAddress
        )
    }

    /**
     * addByPrivateKey
     *
     * Adds an account to the wallet by private key.
     *
     * @param {string} privateKey - hex-encoded private key
     * @returns {string} - the corresponing address, computer from the private key.
     */
    addByPrivateKey(privateKey: string): CreateWalletInterface
    {
        let publicKey = AddressProvider.getPubKeyFromPrivateKey(privateKey);
        let address = AddressProvider.getAddressFromPrivateKey(privateKey);

        return {
            publicKey: publicKey,
            address: {
                base58: this.addressProvider.toBase58(address),
                hex: address
            },
            privateKey: privateKey
        };
    }

    /**
     * addWallet
     *
     * Add a new account to the list where all saved accounts are located
     *
     * @param {WalletOptions} wallet - Details wallet
     * @return void
     */
    addWallet(wallet: Partial<WalletOptions>): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let allWallets = this.listWallets();

            if(this.hasWallet(wallet.address)) {
                this.logger.error(`Already added: Wallet ${wallet.address}`);
                return reject('Account already added')
            }

            let time = new Date().getTime();
            let newWallet = <WalletOptions>{
                id: Object.keys(this.listWallets()).length + 1,
                position: Object.keys(this.listWallets()).length + 1,
                coin: Coin.TRX,
                balance: 0,
                createdOn: Math.round(time / 1000),
                updatedOn: Math.round(time / 1000),
                hideBalance: false,
                color: 'theme-wallet-thunderbird',
                testNet: false,
                ...wallet
            };
            allWallets.push(newWallet);
            // Updating data in the repository
            this.encryptWallet(allWallets, this.password);

            resolve(newWallet)
        })
    }

    /**
     * Retrieving wallet information at address (Not Private key)
     *
     * @param {string} walletAddress - TRON address
     * @return any
     */
    getWallet(walletAddress: string): any
    {
        this.logger.debug(`Get Wallet ID ${walletAddress}`);
        let wallets = this.listWallets().find(c => c.address == walletAddress);

        // Remove private key from the list
        delete wallets['privateKey'];
        return wallets;
    }

    /**
     * Details of the wallet to the address with the included private key
     *
     * @param {string} walletAddress - TRON address
     * @return any
     */
    getWalletAndPrivateKey(walletAddress:string): any
    {
        this.logger.debug(`Get Wallet ID ${walletAddress} with private key`);
        try {
            return this.listWallets().find(
                c => c.address == walletAddress
            );
        }catch (e) {
            throw new Error(`Invalid wallet ID ${walletAddress}`);
        }
    }

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
    updateWallet(walletAddress: string, options: any | UpdateWalletModel): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // We do not allow the possibility of changing important parameters.
            // If these parameters change, the account will be disrupted.
            if(options.createdOn || options.privateKey || options.address || options.id) {
                return reject('Something went wrong');
            }

            try {
                this.logger.debug(`Update Wallet ID ${walletAddress}`);
                // Data update wallet ID
                let updateWalletId = this.listWallets().map(c => {
                    if(c.address != walletAddress) return c;
                    else {
                        return {
                            ...c,
                            ...options
                        };
                    }
                });

                // Update the purse store and make new changes
                this.encryptWallet(updateWalletId, this.password);
                return resolve(this.getWallet(walletAddress));
            }catch (e) {
                return reject(e);
            }
        })
    }

    /**
     * deleteWallet
     *
     * Complete account deletion
     *
     * @param {string} walletAddress - TRON Address
     * @return: void
     */
    deleteWallet(walletAddress: string): void
    {
        // To begin to check whether the exists selected wallet
        if (!this.hasWallet(walletAddress))
            throw new Error('account not found');

        this.logger.info('Deleting Wallet:', walletAddress);
        // Exclude from the list the purse to be deleted
        let updatedWallet = this.listWallets().filter(
            filter => filter.address != walletAddress
        );
        // Update the purse store and make new changes
        this.encryptWallet(updatedWallet, this.password);
    }

    /**
     * isWallet
     *
     * Check if data exists in the repository
     *
     * @return boolean
     */
    public isWallet(): boolean {
        return (this.hashPassword != null);
    }

    /**
     * getWallets
     *
     * Get a list of wallets
     *
     * @param {string} address - TRON address (no required)
     * @return any | string
     */
    public getWallets(address?: string): any | string
    {
        if(address) {
            try {
                let walletID =  this.listWallets().find(
                    f => f.address === address
                );
                // We do not allow the conclusion of a private key
                delete walletID['privateKey'];
                return walletID
            } catch (e) {
                throw new Error(e);
            }
        }

        // An array of wallets without a private key
        return this.listWallets()
            .filter(filter => delete filter['privateKey']);
    }

    /**
     * encryptWallet
     *
     * Encrypt the wallet with all the data
     *
     * @param {any} wallet - wallets data
     * @param {string} password - Password
     * @return void
     */
    public encryptWallet(wallet: any, password: string): void
    {
        try {
            this.wallet = CryptoJS.AES.encrypt(JSON.stringify(wallet), password).toString();
        }catch (e) {
            throw new Error(e)
        }
    }

    /**
     * decryptWallet
     *
     * Decrypt the repository and get all the data
     *
     * @param {string} password - Password
     * @return any
     */
    public decryptWallet(password: string): any
    {
        // If there is no data, create an empty array
        if(this.wallet == null)
            this.encryptWallet([], password);

        try {
            let wallet = CryptoJS.AES.decrypt(this.wallet, password).toString(CryptoJS.enc.Utf8);
            return JSON.parse(wallet) || [];
        }catch (e) {
            throw new Error(e)
        }
    }

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
    createTx(txp: Partial<TransactionProposal>, accountAddress: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // Checking important parameters
            if (_.isEmpty(txp)) return reject('MISSING_PARAMETER');

            this.tron.createTxProposal(
                txp.toAddress,
                txp.amount,
                txp.tokenID,
                accountAddress,
                (err: any, createdTxp: any) => {
                    if (err) return reject(err);
                    else {
                        this.logger.debug('Transaction created');
                        return resolve(createdTxp);
                    }
                });
        })
    }

    /**
     * signTx
     *
     * Signs a provided transaction object.
     *
     * @param {any} transaction - Transaction not signed
     * @return {Promise} - Signed transaction
     */
    signTx(transaction: any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // We check the received parameters before signing
            if(!this.activeAccount || !transaction)
                reject('MISSING_PARAMETER');

            // Validation of the private key (For additional confidence)
            if(!AddressProvider.validatePrivateKey(this.getPrivateKey()))
                reject('Invalid private key');

            // If the main parameters are verified successfully,
            // then proceed to signing the transaction.
            try {
                this.tron.signTxProposal(transaction, this.getPrivateKey(), (err: any, signedTxp: any) => {
                    if (err) {
                        this.logger.error('Transaction signed err: ', err);
                        reject(err);
                    }
                    resolve(signedTxp);
                })
            }catch (e) {
                this.logger.error('Error at signTxProposal:', e);
                reject(e);
            }
        });
    }

    /**
     * broadcastTx
     *
     * Sending a transaction to the network
     *
     * @param {any} transaction - Transaction details (with signature)
     * @return {Promise} - If successful that "result: true"
     */
    broadcastTx(transaction: any): Promise<any>
    {
        return new Promise((resolve, reject) => {

            // Check whether transactions are signed
            if(!transaction.signature)
                reject('Transaction not signed');

            // If there are no serious problems, send the transaction to the network
            this.tron.broadcastTxProposal(transaction, {}, (err: any, broadcastedTxp: any) => {
                // If you have problems sending a transaction
                if(err) {
                    return reject(err);
                }
                this.logger.info('Transaction broadcasted');
                return resolve(broadcastedTxp);
            })
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
    }

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
    verifySignature(options: Partial<VerifySignatureProposal>): Promise<any>
    {
        return new Promise((resolve, reject) => {

            // Before the main checks, we affirm that the signature
            // complies with the rules
            if(!isHex(options.signature))
                reject('Invalid signature');

            try {
                this.tron.verifyMessage(options.message, options.signature, options.address,
                    (err: any, verifySig: any) => {

                        // If you have problems checking
                        if (err) {
                            this.logger.error('Message verify err: ', err);
                            reject(err);
                        }
                        resolve(verifySig);
                });
            }catch (e) {
                this.logger.error('Error at message Verify:', e);
                reject(e);
            }
        });
    }

    /**
     * getBalance
     *
     * Getting the actual balance from the node
     *
     * @param {string} account - TRON Address (Recommend base58)
     * @return {Promise} - In case of luck, we get the balance in "number"
     */
    public getBalance(account: string): Promise<number>
    {
        return new Promise((resolve, reject) => {
            // Convert to base58
            account = this.addressProvider.toBase58(account);

            // Send a request to the node to get the current balance
            this.tron.getBalance(account, (err: any, balanceAddr: any) =>{
                // If you're having trouble checking your balance
                if(err) reject(err);
                resolve(balanceAddr)
            })
        });
    }


    /**
     * getAccount
     *
     * Retrieving Account Details
     *
     * @param {string} account - TRON Address
     * @return {Promise} - return account information
     */
    public getAccount(account: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // Convert to base58
            account = this.addressProvider.toBase58(account);

            this.tron.getAccount(account, (err: any, addrInfo: any) => {
                // If you're having trouble checking your account
                if(err) reject(err);
                resolve(addrInfo)
            });
        });
    }

    /**
     * getAccountResources
     *
     * Gets the account's bandwidth and energy resources.
     *
     * @param {string} account - TRON Address
     * @return {Promise} - return account's bandwidth and energy resources.
     */
    public getAccountResources(account: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // Convert to base58
            account = this.addressProvider.toBase58(account);

            this.tron.getAccountResources(account, (err: any, resourceAddr: any) => {
                // If you're having trouble checking your account resources
                if(err) reject(err);
                resolve(resourceAddr)
            });
        });
    }

    /**
     * getBandwidth
     *
     * Receiving bandwidth account
     *
     * @param {string} account - TRON Address
     * @return {Promise} - return account's bandwidth
     */
    public getBandwidth(account: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.tron.getBandwidth(account, (err: any, bandWidthAddr: any) => {
                // If you're having trouble checking your account bandwidth
                if(err) reject(err);
                resolve(bandWidthAddr)
            });
        })
    }

    /**
     * prepare
     *
     * Before receiving data, you must pass authorization
     *
     * @param {string} password - Auth password
     * @return {Promise} - return hash password
     */
    public prepare(password: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            try {
                let wallet = CryptoJS.AES.decrypt(
                    this.wallet,
                    password).toString(CryptoJS.enc.Utf8);
                // If the storage is empty, we return an error
                if(wallet == '') reject('PASSWORD_CANCELLED');
                resolve(password);
            }catch (e) {
                return reject(new Error('WRONG_PASSWORD'))
            }
        });
    }

    /**
     * encryptPassword
     *
     * For added security, encrypt the password when registering a wallet
     */
    static encryptPassword(password: string) {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
    }

    /**
     * createPassword
     *
     *  Create and write password hash in local storage
     *
     *  @param {string} password - user password
     *  @return {Promise} - If everything successfully returns the password hash
     */
    createPassword(password: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if(!this.hashPassword)
            {
                this.hashPassword = WalletProvider.encryptPassword(password);
                this.encryptWallet([], this.hashPassword);
                this._password = this.hashPassword;
                return resolve({
                    'result': true
                });
            }
            reject('Password has already been created')
        });
    }

    /**
     * hasPassword
     *
     * Verification of passwords to log into the account
     *
     * @param {string} password - password
     */
    hasPassword(password: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // If no password is specified
            if(password && password.length < 1)
                return reject('Password not specified');

            // Blocking due to multiple authorizations
            // Useful feature for security at the entrance
            if(this.unlockTime && this.unlockTime != 0)
            {
                let endDate = new Date(this.unlockTime);
                let minutes = new Date((endDate.getTime() - new Date().getTime())).getMinutes();

                // If the lock time exceeds the current time,
                // then remove the lock
                if(new Date().getTime() > new Date(this.unlockTime).getTime()) {
                    this.unlockTime = 0;
                    return this.countAttempted = 0;
                }

                return reject(`Too many login attempts. Please try again in ${minutes} minutes.`)
            }

            // If the number of non-daily attempts exceeds the set,
            // temporarily block the authorization
            // Note: The number of unsuccessful attempts must be greater than 2.
            if(this.countAttempted > (env.login.failedLogin < 2 ? 5 : env.login.failedLogin))
            {
                if(this.unlockTime == null || this.unlockTime == 0) {
                    let ex = new Date(Date.now());
                    ex.setMinutes(ex.getMinutes() + env.login.lockedMinutes);
                    this.unlockTime = Math.floor(ex.getTime());
                }
                return reject('Too many failed attempts, repeat later.')
            }

            // If the passwords do not match
            if(WalletProvider.encryptPassword(password) != this.hashPassword) {
                this.countAttempted++; // Authorization Attempt Counter
                return reject('Invalid password');
            }

            this._password = WalletProvider.encryptPassword(password);

            resolve({
                result: true,
                hash: this.password
            })
        })
    }

    /**
     * getPrivateKey
     *
     * Getting the private key of the selected account
     *
     * @return {Buffer} - return buffer private key
     */
    getPrivateKey(): Buffer
    {
        // If there are no active wallets, we return an error
        if(!this.activeAccount)
            throw new Error('Invalid selected account');

        try {
            let privateKey = this.listWallets().find(
                f => f.address == this.activeAccount
            );
            return Buffer.from(privateKey['privateKey'], 'hex');
        }catch (e) {
            throw new Error(e)
        }
    }

    /**
     * setPassword
     *
     * Write the entered password to the variable.
     *
     * @param {string} val - Password
     */
    set password(val: string) {
        this._password = val;
    }

    /**
     * getPassword
     *
     * Get the password you entered
     *
     * @return string
     */
    get password(): string {
        return this._password
    }

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
    getTxsFromServer(options: Partial<TrxHistoryProposal>): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let res: any = [];

            let result = {
                res,
                total: 0,
                shouldContinue: res.length || 0 >= options.limit
            };

            this.tron.getTxHistory(
                options.address,
                options.start,
                options.limit,
                options.total,
                (err: any, historyTx: any) =>
                {
                    // In case of problems, we don’t continue
                    if (err) return reject(err);
                    // If you received an empty response from the server, do not continue
                    if (_.isEmpty(historyTx['data'])) return resolve(result);

                    //Returns all transactions to the address, if the "endingTxID" is filled in,
                    // in this case, we will not receive data beyond this id
                    res = _.takeWhile(historyTx['data'], (tx: any) => {
                        return tx.hash != options.endingTxID;
                    });

                    // Turning off unnecessary contractual transactions.
                    res = _.filter(historyTx['data'], (tx: any) => {
                        return ![10,30,31].includes(tx.contractType);
                    });

                    // Set types for transactions
                    res = res.map(tx => {
                        return {...tx, type: WalletProvider.getContractType(tx.contractType)}
                    });

                    result.res = res;
                    result.total = historyTx.total;
                    result.shouldContinue = res.length >= options.limit;

                    return resolve(result);
                })
        })
    }

    /**
     * getTx
     *
     * Gets a transaction by transaction ID.
     *
     * @param {string} txHash - Transaction ID
     * @return {Promise} - transaction into
     */
    getTx(txHash: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.tron.getTransaction(txHash, (err: any, txHistory: any) =>
            {
                // If errors occur, do not skip any further.
                if(err) return reject(err);
                // If "hash" is empty, then we consider it as an error
                if(_.isEmpty(txHistory['hash']))
                    return reject('Could not get transaction');

                resolve(txHistory);
            })
        });
    }

    /**
     * addByMnemonic
     *
     * Adds an `Account` by use of a mnemonic as specified in BIP-32 and BIP-39
     *
     * @param {string} phrase - 12-word mnemonic phrase
     * @param {number} index=0 - the number of the child key to add
     * @returns {string} - the corresponding address
     */
    addByMnemonic(phrase: string, index: number = 0)
    {
        if (!WalletProvider.isValidMnemonic(phrase))
            throw new Error(`Invalid mnemonic phrase: ${phrase}`);

        const seed = bip39.mnemonicToSeed(phrase);
        const hdKey = hdkey.fromMasterSeed(seed);
        const childKey = hdKey.derive(`m/44'/195'/${ index }'/0/0`);
        const privateKey = childKey.privateKey.toString('hex');

        return this.addByPrivateKey(privateKey);
    }

    /**
     * Validation Mnemonic
     *
     * @param {string} phrase - Phrase 12 worlds
     * @return boolean
     * */
    private static isValidMnemonic(phrase: string): boolean {
        if (phrase.trim().split(/\s+/g).length < 12) {
            return false;
        }
        return bip39.validateMnemonic(phrase);
    }

    /**
     * updateAccount
     *
     * Account Master Data Update
     *
     * @param {string} account - Tron Address
     * @return void
     */
    async updateAccount(account: string)
    {
        await this.getAccountResources(account)
            .then(({freeNetUsed = 0, freeNetLimit = 0, NetUsed = 0, NetLimit = 0, EnergyLimit = 0}) => {
                this.bandwidth  = (freeNetLimit - freeNetUsed) + (NetLimit - NetUsed);
                this.energy = EnergyLimit;
            });
    }

    /**
     * fullUpdateAccount
     *
     * Full account data update
     *
     * @param {string} walletAddress - Tron Address
     * @return void
     */
    async fullUpdateAccount(walletAddress: string)
    {
        // Update bandwidth and energy
        await this.updateAccount(walletAddress);
        // Update account balance
        await this.getAccount(walletAddress).then(account => {

            this.balance = account.balance;
            // Fix the update date
            this.lastUpdated = Date.now();

            // This condition is necessary for new accounts.
            let tronPower = (account && account['frozen'] ?
                Number(this.tron.fromSun(account['frozen'][0]['frozen_balance'])) : 0);

            // Before adding a token, check and change keys
            let tokens = (account.asset || []).filter(({ value }) => {
                return value > 0;
            }).map(({ key, value }) => ({ name: key, value }));

            this.updateWallet(walletAddress, {
                balance: this.balance || 0,
                bandwidth: this.bandwidth || 0,
                energyLimit: this.energy || 0,
                lastUpdated: this.lastUpdated,
                tronPower: tronPower || 0,
                tokens: tokens || []
            }).then(resultUpdate => {

                const update: Update<any> = {
                    id: resultUpdate.id,
                    changes: {
                        balance: resultUpdate.balance,
                        bandwidth: resultUpdate.bandwidth,
                        energyLimit: resultUpdate.energyLimit,
                        lastUpdated: resultUpdate.lastUpdated,
                        tronPower: resultUpdate.tronPower,
                        tokens: resultUpdate.tokens
                    }
                };

                this.store.dispatch(
                    new WalletActions.UpdateWallet({ wallet: update})
                );
            })
        });
    }

    /**
     * Getting a list of types
     *
     * @param {number} number - Contract type
     * @returns {string}
     */
    private static getContractType(number: number)
    {
        switch (number) {
            case 1:
                return 'Transfer';
            case 2:
                return 'Transfer Asset';
            case 4:
                return 'Vote';
            case 6:
                return 'Create';
            case 9:
                return 'Participate';
            case 11:
                return 'Freeze';
            case 12:
                return 'Unfreeze';
            case 44:
                return 'Exchange';
            default:
                return 'Unregistred Name';
        }
    }
}
