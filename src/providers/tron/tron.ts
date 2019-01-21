/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';

import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

// TronWeb declare module
import TronWeb from 'tronweb';
import env from '../../environments';

// Providers
import { Logger } from '@providers/logger/logger';

// Interface API Nodes
export interface TronNodesInterface {
    name: string;
    fullNode: string;
    solidityNode: string;
    eventServer: string;
}

@Injectable()
export class TronProvider {
    /**
     * Selected account
     *
     * @var any
     */
    @LocalStorage()
    private readonly activeAccount: string;

    /**
     * Node storage
     *
     * @var string
     */
    @LocalStorage()
    nodes: string;

    /**
     * Basic methods of 'tronWeb'
     *
     * @var any
     */
    public client: TronWeb | any;

    /**
     * List of loaded tokens
     *
     * @var any
     */
    private listTokens: any;

    /**
     * Selected node
     *
     * @var any
     */
    @LocalStorage()
    public selectedNode: string;

    /**
     * Default node ID
     *
     * @var string
     */
    private readonly defaultNodeID: string = '493e0017-66e5-44d0-9eb2-1f454d13cf3e';

    /**
     * List of all available nodes
     *
     * @var object
     */
    public defaultNodes: object = {
        /**
         * Tron MainNet Network
         */
        '493e0017-66e5-44d0-9eb2-1f454d13cf3e': {
            name: 'Mainnet',
            fullNode: 'https://api.trongrid.io',
            solidityNode: 'https://api.trongrid.io',
            eventServer: 'https://api.trongrid.io'
        },

        /**
         * Test Network
         *
         * Shasta offers an easy way to connect to the TRON private test network,
         * with all the developer tools,
         * explorer and services you'll need for your next project.
         */
        '532a9484-31eb-4046-a8a2-3488285e4c1b': {
            name: 'Shasta Testnet',
            fullNode: 'https://api.shasta.trongrid.io',
            solidityNode: 'https://api.shasta.trongrid.io',
            eventServer: 'https://api.shasta.trongrid.io'
        },
    };

    /**
     * Object creation TronProvider
     *
     * @param {HttpClient} http - Perform HTTP requests.
     * @param {Logger} logger - Log provider
     */
    constructor(
        private http: HttpClient,
        private logger: Logger
    ) {
        this.logger.debug('TronProvider initialized');

        // The most important thing:
        // In the event that there is no default data in the local storage,
        // we load several nodes
        if (!this.nodes) {
            this.nodes = JSON.stringify(this.defaultNodes);
        }

        this.selectNode(this.selectedNode);
    }

    /**
     * Client update, for data to take effect
     *
     * @return {Promise}
     */
    updateTronClient(): Promise<any> {
        return new Promise<any>(() => {
            this.getCurrentNode()
                .then(n => {
                    // Establish connections with "TronWeb"
                    this.client = new TronWeb(
                        n.fullNode,
                        n.solidityNode,
                        n.eventServer
                    );
                });

        });
    }

    /**
     * Get active node
     *
     * @return {Promise}
     */
    getCurrentNode(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getNodes()
                .then(node => {
                    if (node && node[this.selectedNode]) {
                        return resolve(node[this.selectedNode]);
                    }
                })
                .catch(() => {
                    return reject();
                });
        });
    }

    /**
     * Getting all available nodes
     *
     * @return {Promise}
     */
    getNodes(): Promise<any> {
        return new Promise((resolve) => {
            if (this.nodes && _.isString(this.nodes)) {
                resolve(JSON.parse(this.nodes) || {});
            }

            return resolve({}); // As addition
        });
    }

    /**
     * Adding new nodes
     *
     * @param {TronNodesInterface} node - node detail
     * @return {Promise}
     */
    public addNode(node: TronNodesInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            // Check if the address exists in the contact list
            this.getNodes()
                .then(n => {
                    const nameState = Object.values(n).some((item: any) => (
                        item.name.toLowerCase() == node.name.trim().toLowerCase()
                    ));

                    // Name verification before adding
                    if (nameState) {
                        reject('Name is busy, use another');
                    }

                    // If "Event Server" is not specified, we write from the default list.
                    if (!node.eventServer) {
                        node.eventServer = this.defaultNodes[this.defaultNodeID].eventServer;
                    }

                    // Add a new nodes to the list
                    n[uuid()] = node;
                    this.nodes = JSON.stringify(n);

                    return resolve(n);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    /**
     * Delete node
     *
     * @param {string} nodeId - node id
     * @return {Promise}
     */
    public removeNode(nodeId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // Check if the id exists in the nodes list
            this.getNodes()
                .then(n => {
                    // Check if there are any nodes in the list.
                    if (_.isEmpty(n)) {
                        return reject('Nodes is empty');
                    }

                    // Check if the node exists in the list
                    if (!n[nodeId]) {
                        return reject('Node does not exist');
                    }

                    // In case of deleting the active node,
                    // switch to the node which is available by default.
                    if (nodeId == this.selectedNode) {
                        this.selectNode(this.defaultNodeID);
                    }

                    // Exclude remote node from list
                    delete n[nodeId];

                    this.nodes = JSON.stringify(n);
                    return resolve(n);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    /**
     * Activate new nodes
     *
     * @param {string} nodeID - id node
     * @return void
     */
    selectNode(nodeID: string): void {
        // If the node is not selected, manually activate
        if (!this.selectedNode) {
            nodeID = this.defaultNodeID;
        }

        this.selectedNode = nodeID;
        this.updateTronClient().then(() => {});
    }

    /**
     * Get network type
     *
     * @returns {boolean}
     */
    isShasta(): boolean {
        return this.selectedNode == '532a9484-31eb-4046-a8a2-3488285e4c1b';
    }

    /**
     * Get explorer api
     *
     * @returns {string}
     */
    getExplorer(): string {
        return (this.isShasta() ? env.shasta.api : env.explorer.api);
    }

    /**
     * Get List of loaded tokens
     *
     * @return any[]
     */
    getListTokens(): any[] {
        return this.listTokens;
    }

    /**
     * Loading tokens
     *
     * @return {Promise}
     */
    async loadListTokens(limit?, offset?, callback?: any): Promise<any> {
        this.listTokens = await this.client.trx.listTokens(limit, offset, callback);
    }

    /**
     * Creates an unsigned freeze TRX transaction.
     *
     * @param {number} amount - Amount of TRX (in SUN) to freeze.
     * @param {number} duration - Length in Days to freeze TRX for. Minimum of 3 days.
     * @param {string} resource - Resource that you're freezing TRX in order to obtain.
     * @param {string} address - Address of the owner of the TRX to be frozen.
     *
     * @return Promise
     */
    public freezeBalance(amount: number = 0, duration: number = 3, resource: string = 'BANDWIDTH', address: string): Promise<any> {
        try {
            return this.client.transactionBuilder.freezeBalance(this.toSun(amount), duration, resource, address);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Creates an unsigned unfreeze TRX transaction.
     * Unfreezing will unfreeze ALL TRX for the specified resource.
     * If you unfreeze for BANDWIDTH, it will remove all TRON POWER which will also remove all VOTES.
     * If the bandwidth is already spent, the account will be negative for bandwidth.
     *
     * @param {string} resource - Resource that you're freezing TRX in order to obtain.
     * @param {string} address - Address of the owner of the TRX to be frozen.
     *
     * @return Promise
     */
    public unfreezeBalance(resource: string = 'BANDWIDTH', address: string): Promise<any> {
        try {
            return this.client.transactionBuilder.unfreezeBalance(resource, address);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * createTxProposal
     *
     * Create transaction
     *
     * @param {string} toAddress - Address to send TRX to.
     * @param {number} amount - Amount of TRX to send.
     * @param {string} tokenID - Name of the token, matching the exact capitalization.
     * @param {string} fromAddress - Sender address
     * @param {any} callback - callback result
     * @return {Promise} - return signed transaction
     */
    async createTxProposal(toAddress: string, amount: number, tokenID: string, fromAddress?: string, callback?: any): Promise<any> {
        // If the sender is not specified, then we take it from the selected.
        if (fromAddress == null) {
            fromAddress = this.activeAccount;
        }

        if (['TRX', '1'].includes(tokenID)) {
            return this.client.transactionBuilder.sendTrx(
                toAddress,
                this.toSun(amount),
                fromAddress,
                callback
            );
        }

        return this.client.transactionBuilder.sendToken(
            toAddress,
            amount,
            tokenID,
            fromAddress,
            callback
        );
    }

    /**
     * signTxProposal
     *
     * Offline signed transaction
     *
     * @param {any | string} transaction - Transaction
     * @param {string} privateKey - Private key for signature
     * @param {any} callback - Callback result
     * @return {Promise} - return signed transaction
     */
    async signTxProposal(transaction: any | string, privateKey: Buffer, callback?: any): Promise<any> {
        try {
            // If the "transaction" string, then sign the message and not the transaction
            if (typeof transaction == 'string') {
                transaction = this.client.toHex(transaction);
            }

            return await this.client.trx.sign(transaction, privateKey.toString('hex'), true, callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * broadcastTxProposal
     *
     * Broadcasts a signed raw transaction to the network.
     *
     * @param {any} transaction - Transaction details (with signature)
     * @param {Object} options - Additional options
     * @param {any} callback - Callback result
     * @return {Promise} - If successful that "result: true"
     */
    async broadcastTxProposal(transaction: any, options: object = {}, callback?: any): Promise<any> {
        try {
            return await this.client.trx.sendRawTransaction(transaction, options, callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * verifyMessage
     *
     * Check signed message
     *
     * @param {string} message - Original message
     * @param {string} signature - Hash signature
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return Promise
     */
    async verifyMessage(message: string, signature: string, address: string, callback?: any): Promise<any> {
        try {
            return await this.client.trx.verifyMessage(
                this.client.toHex(message),
                signature,
                address,
                callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * getBalance
     *
     * Request for balance by TRON address
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - In case of luck, we get the balance in "number"
     */
    async getBalance(address: string, callback?: any): Promise<number> {
        try {
            return await this.client.trx.getBalance(address, callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * getAccount
     *
     * Request for account information by TRON address
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - return account information
     */
    async getAccount(address: string, callback?: any): Promise<any> {
        try {
            return await this.client.trx.getAccount(address, callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * getUnconfirmedAccount
     *
     * Request for account information by TRON address
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - return account information
     */
    async getUnconfirmedAccount(address: string, callback?: any): Promise<any> {
        try {
            return await this.client.trx.getUnconfirmedAccount(address, callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * getAccountResources
     *
     * Request for receipt bandwidth and energy by TRON address
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - return account's bandwidth and energy resources.
     */
    async getAccountResources(address: string, callback?: any): Promise<any> {
        try {
            return await this.client.trx.getAccountResources(address, callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * getBandwidth
     *
     * Send Bandwidth Request
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - return account's bandwidth
     */
    async getBandwidth(address: string, callback?: any): Promise<any> {
        try {
            return await this.client.trx.getBandwidth(address, callback);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * getTxHistory
     *
     * Request to receive all transactions
     * Note: Data is obtained from "TronScan Explorer"
     *
     * @param {string} address - Tron Address.
     * @param {number} start - Start to return from.
     * @param {number} limit - Limit the number of returned tx.
     * @param {number} total - Total Tx.
     * @param {any} callback - callback result
     * @return {Promise} return transactions
     */
    async getTxHistory(address: string, start: number = 0, limit: number = 20, total: number = 0, callback?: any): Promise<any> {
        const scan = `${this.getExplorer()}/transaction?count=true&sort=-timestamp&limit=${limit}&start=${start}&total=${total}&address=${address}`;
        return this.http.get(scan)
            .subscribe(
                result => {
                    callback(null, result);
                },
                error => callback(error)
            );
    }

    /**
     * getTransaction
     *
     * Request for transaction details by "txHash"
     *
     * @param {string} txHash - Transaction ID
     * @param {any} callback - callback return
     * @return {Promise} - transaction into
     */
    async getTransaction(txHash: string, callback?: any): Promise<any> {
        try {
            return await this.http.get(`${this.getExplorer()}/transaction-info?hash=${txHash}`).subscribe(
                result => callback(null, result),
                error => callback(error)
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * createVoteProposal
     *
     * Send a request to create a transaction
     *
     * @param {any} votes - Object votes
     * @param {string} voterAddress - Sender address
     * @param {any} callback - callback result
     * @return {Promise} - return signed transaction
     */
    async createVoteProposal(votes: any = {}, voterAddress: string, callback?: any) {
        // If the sender is not specified, then we take it from the selected.
        if (voterAddress == null) { voterAddress = this.activeAccount; }

        return this.client.transactionBuilder
            .vote(votes, voterAddress, callback);
    }

    /**
     * getVoteHistory
     *
     * Request for a list of votes
     *
     * @param {any} callback - callback return
     * @return {Promise} - votes into
     */
    async getVoteHistory(callback?: any): Promise<any> {
        try {
            return await this.http.get(`${this.getExplorer()}/vote/witness`).subscribe(
                result => callback(null, result),
                error => callback(error)
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Helper function that will convert a value in TRX to SUN
     *
     * @param {number} amount - TRX amount
     * @return number
     */
    public toSun(amount: number): number {
        return this.client.toSun(amount);
    }

    /**
     * Helper function that will convert a value in SUN to TRX
     *
     * @param {number} amount - Sun amount
     * @return number
     */
    public fromSun(amount: number): number {
        return this.client.fromSun(amount);
    }

    /**
     * Convert address from hex to base58
     *
     * @param {string} address - TRON Address
     * @return string
     */
    addressFromHex(address: string): string {
        try {
            return this.client.address.fromHex(address);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Convert address from base58 to HEX
     *
     * @param {string} address - TRON Address
     * @return string
     */
    addressToHex(address: string): string {
        try {
            return this.client.address.toHex(address);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Convert private key to Base58 address
     *
     * @param {string} privateKey - Private Key
     * @return string
     */
    fromPrivateKey(privateKey: string): string {
        try {
            return this.client.address.fromPrivateKey(privateKey);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Validation TRON Address
     *
     * @param {string} address - TRON Address
     * @return boolean
     */
    isAddress(address: string): boolean {
        try {
            return this.client.isAddress(address);
        } catch (e) {
            return false;
        }
    }
}
