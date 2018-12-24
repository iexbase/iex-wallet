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
import { HttpClient } from "@angular/common/http";
import { LocalStorage } from "ngx-webstorage";
// TronWeb declare module
import TronWeb from "tronweb";
import env from "../../environments";
// Providers
import { Logger } from "@providers/logger/logger";
var TronProvider = /** @class */ (function () {
    /**
     * Object creation TronProvider
     *
     * @param http - HttpClient Provider
     * @param logger - Logger
     */
    function TronProvider(http, logger) {
        this.http = http;
        this.logger = logger;
        /**
         * Type of network used
         *
         * @var string
         */
        this.network = 'mainnet';
        /**
         * List of all available nodes
         *
         * @var any
         */
        this.listNodes = {
            /**
             * Tron MainNet Network
             */
            '493e0017-66e5-44d0-9eb2-1f454d13cf3e': {
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
                fullNode: 'https://api.shasta.trongrid.io',
                solidityNode: 'https://api.shasta.trongrid.io',
                eventServer: 'https://api.shasta.trongrid.io'
            },
        };
        this.logger.debug('TronProvider initialized');
        // We get the node with which the project will work
        this.selectedNode = (this.network == 'mainnet')
            ? this.listNodes['493e0017-66e5-44d0-9eb2-1f454d13cf3e'] :
            this.listNodes['532a9484-31eb-4046-a8a2-3488285e4c1b'];
        this.client = new TronWeb(this.selectedNode.fullNode, this.selectedNode.solidityNode, this.selectedNode.eventServer);
    }
    /**
     * Getting network type
     *
     * @return any
     */
    TronProvider.prototype.getNetwork = function () {
        return {
            network: this.network
        };
    };
    /**
     * List nodes
     *
     * @return any
     */
    TronProvider.prototype.getNodes = function () {
        return {
            nodes: this.listNodes,
            selectedNode: this.selectedNode
        };
    };
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
    TronProvider.prototype.freezeBalance = function (amount, duration, resource, address) {
        if (amount === void 0) { amount = 0; }
        if (duration === void 0) { duration = 3; }
        if (resource === void 0) { resource = "BANDWIDTH"; }
        try {
            return this.client.transactionBuilder.freezeBalance(this.toSun(amount), duration, resource, address);
        }
        catch (e) {
            throw new Error(e);
        }
    };
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
    TronProvider.prototype.unfreezeBalance = function (resource, address) {
        if (resource === void 0) { resource = "BANDWIDTH"; }
        try {
            return this.client.transactionBuilder.unfreezeBalance(resource, address);
        }
        catch (e) {
            throw new Error(e);
        }
    };
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
    TronProvider.prototype.createTxProposal = function (toAddress, amount, tokenID, fromAddress, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //If the sender is not specified, then we take it from the selected.
                        if (fromAddress == null)
                            fromAddress = this.activeAccount;
                        if (!(tokenID == 'TRX')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.transactionBuilder.sendTrx(toAddress, this.toSun(amount), fromAddress, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.client.transactionBuilder.sendToken(toAddress, this.toSun(amount), tokenID, fromAddress, callback)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
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
    TronProvider.prototype.signTxProposal = function (transaction, privateKey, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // If the "transaction" string, then sign the message and not the transaction
                        if (typeof transaction == 'string')
                            transaction = this.client.toHex(transaction);
                        return [4 /*yield*/, this.client.trx.sign(transaction, privateKey.toString('hex'), true, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
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
    TronProvider.prototype.broadcastTxProposal = function (transaction, options, callback) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.trx.sendRawTransaction(transaction, options, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw new Error(e_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
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
    TronProvider.prototype.verifyMessage = function (message, signature, address, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.trx.verifyMessage(this.client.toHex(message), signature, address, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        throw new Error(e_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getBalance
     *
     * Request for balance by TRON address
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - In case of luck, we get the balance in "number"
     */
    TronProvider.prototype.getBalance = function (address, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.trx.getBalance(address, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        throw new Error(e_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getAccount
     *
     * Request for account information by TRON address
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - return account information
     */
    TronProvider.prototype.getAccount = function (address, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.trx.getAccount(address, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_5 = _a.sent();
                        throw new Error(e_5);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getAccountResources
     *
     * Request for receipt bandwidth and energy by TRON address
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - return account's bandwidth and energy resources.
     */
    TronProvider.prototype.getAccountResources = function (address, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.trx.getAccountResources(address, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_6 = _a.sent();
                        throw new Error(e_6);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getBandwidth
     *
     * Send Bandwidth Request
     *
     * @param {string} address - TRON Address
     * @param {any} callback - callback result
     * @return {Promise} - return account's bandwidth
     */
    TronProvider.prototype.getBandwidth = function (address, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.trx.getBandwidth(address, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_7 = _a.sent();
                        throw new Error(e_7);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
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
    TronProvider.prototype.getTxHistory = function (address, start, limit, total, callback) {
        if (start === void 0) { start = 0; }
        if (limit === void 0) { limit = 20; }
        if (total === void 0) { total = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var scan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scan = env.explorer.api + "/transaction?count=true&sort=-timestamp&limit=" + limit + "&start=" + start + "&total=" + total + "&address=" + address;
                        return [4 /*yield*/, this.http.get(scan)
                                .subscribe(function (result) {
                                callback(null, result);
                            }, function (error) { return callback(error); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * getTransaction
     *
     * Request for transaction details by "txHash"
     *
     * @param {string} txHash - Transaction ID
     * @param {any} callback - callback return
     * @return {Promise} - transaction into
     */
    TronProvider.prototype.getTransaction = function (txHash, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(env.explorer.api + "/transaction/" + txHash).subscribe(function (result) { return callback(null, result); }, function (error) { return callback(error); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_8 = _a.sent();
                        throw new Error(e_8);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Helper function that will convert a value in TRX to SUN
     *
     * @param {number} amount - TRX amount
     * @return number
     */
    TronProvider.prototype.toSun = function (amount) {
        return this.client.toSun(amount);
    };
    /**
     * Helper function that will convert a value in SUN to TRX
     *
     * @param {number} amount - Sun amount
     * @return number
     */
    TronProvider.prototype.fromSun = function (amount) {
        return this.client.fromSun(amount);
    };
    /**
     * List of available contract types
     *
     * @param {number} number - Type Contract
     * @return string
     */
    TronProvider.prototype.getContractType = function (number) {
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
    };
    /**
     * Convert address from hex to base58
     *
     * @param {string} address - TRON Address
     * @return string
     */
    TronProvider.prototype.addressFromHex = function (address) {
        try {
            return this.client.address.fromHex(address);
        }
        catch (e) {
            throw new Error(e);
        }
    };
    /**
     * Convert address from base58 to HEX
     *
     * @param {string} address - TRON Address
     * @return string
     */
    TronProvider.prototype.addressToHex = function (address) {
        try {
            return this.client.address.toHex(address);
        }
        catch (e) {
            throw new Error(e);
        }
    };
    /**
     * Convert private key to Base58 address
     *
     * @param {string} privateKey - Private Key
     * @return string
     */
    TronProvider.prototype.fromPrivateKey = function (privateKey) {
        try {
            return this.client.address.fromPrivateKey(privateKey);
        }
        catch (e) {
            throw new Error(e);
        }
    };
    /**
     * Validation TRON Address
     *
     * @param {string} address - TRON Address
     * @return boolean
     */
    TronProvider.prototype.isAddress = function (address) {
        try {
            return this.client.isAddress(address);
        }
        catch (e) {
            return false;
        }
    };
    __decorate([
        LocalStorage(),
        __metadata("design:type", Object)
    ], TronProvider.prototype, "activeAccount", void 0);
    TronProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            Logger])
    ], TronProvider);
    return TronProvider;
}());
export { TronProvider };
//# sourceMappingURL=tron.js.map