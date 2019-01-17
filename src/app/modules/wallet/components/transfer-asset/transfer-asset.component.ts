/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Inject, OnInit} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import {LocalStorage} from "ngx-webstorage";
import { Store } from "@ngrx/store";

import * as _ from "lodash";

// Redux
import { AppState } from "@redux/index";

// Providers
import { AddressProvider } from "@providers/address/address";
import { ConfigProvider } from "@providers/config/config";
import { ElectronProvider } from "@providers/electron/electron";
import { WalletProvider } from "@providers/wallet/wallet";
import { RateProvider } from "@providers/rate/rate";
import { FilterProvider } from "@providers/filter/filter";
import {AddressBookProvider} from "@providers/address-book/address-book";

@Component({
    selector: 'transfer-asset',
    templateUrl: './transfer-asset.component.html',
    styleUrls: ['./transfer-asset.component.scss'],
})
export class TransferAssetComponent implements OnInit
{
    /**
     * Filtered tokens
     *
     * @var string
     */
    @LocalStorage()
    filteredTokens: string;

    /**
     * Status of sending all balance
     *
     * @var boolean
     */
    useSendMax: boolean;

    /**
     * Convert to alternative amount
     *
     * @var number
     */
    alternativeAmount: number;

    /**
     * Animation configure (Lottie)
     *
     * @var Object
     */
    lottieConfig: Object;

    /**
     * Received data from the main source
     *
     * @var any
     */
    wallet:any = {};

    /**
     * Transaction Confirmation Status
     *
     * @var boolean
     */
    isConfirmed: boolean = false;

    /**
     * Button lock status
     *
     * @var boolean
     */
    isButtonDisabled: boolean = false;

    /**
     * Transaction Successful Transaction Status
     *
     * @var boolean
     */
    isSuccess:boolean = false;

    /**
     * Status of receipt of transaction details
     *
     * @var boolean
     */
    isTransactionInfo: boolean = false;

    /**
     * Alternative Unit code
     *
     * @var string
     */
    fiatCode: string;

    /**
     * Available fields to fill
     *
     * @var any
     */
    fields: any = {
        token: <string> '0',
        toAddress: <string> '',
        amount: <number> 0,
        type: <string> 'TRX'
    };

    /**
     * Details for confirmation
     *
     * @var any
     */
    confirmDetails: any = {};

    /**
     * Signature Details
     *
     * @var any
     */
    signedTransaction: any;

    /**
     * List available tokens
     *
     * @var any[]
     */
    listTokens = [];

    /**
     * Filtered List available tokens
     *
     * @var any[]
     */
    filteredListTokens: any = <any>[];

    /**
     * Search input (ngModel)
     *
     * @var string
     */
    filterSearch: string;

    /**
     * Get token balance
     *
     * @var number
     */
    tokenBalance: number;

    /**
     * Get token name
     *
     * @var string
     */
    tokenName: string;

    /**
     * Convert unit to sun
     *
     * @var number
     */
    private unitToSun: number = 1e6;

    /**
     * Convert sun to unit
     *
     * @var number
     */
    private sunToUnit: number;

    /**
     * Get filtered contact list
     *
     * @var any[]
     */
    public filteredContactsList: any[] = [];

    /**
     * Check if contact list exists
     *
     * @var boolean
     */
    public hasContacts: boolean;

    /**
     * Create a new TransferAssetComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {ElectronProvider} electron - Electron provider
     * @param {ConfigProvider} config - Config provider
     * @param {Store} store - Reactive service
     * @param {AddressProvider} addressProvider - Address provider
     * @param {RateProvider} rateProvider - Rate provider
     * @param {FilterProvider} filterProvider - Filter provider
     * @param {AddressBookProvider} addressBookProvider - Address book provider
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<TransferAssetComponent>,
        private walletProvider: WalletProvider,
        public snackBar: MatSnackBar,
        public electron: ElectronProvider,
        public config: ConfigProvider,
        protected store: Store<AppState>,
        private addressProvider: AddressProvider,
        private rateProvider: RateProvider,
        private filterProvider: FilterProvider,
        private addressBookProvider: AddressBookProvider,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.lottieConfig = {
            path: 'assets/animations/checked_done_.json',
            renderer: 'canvas',
            autoplay: true,
            loop: false
        };
        this.sunToUnit = 1 / this.unitToSun;
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit()
    {
        this.wallet = this.data;
        this.fiatCode = this.data.altCode;

        // Balance update
        this.walletProvider.fullUpdateAccount(this.wallet.address)
            .then(() => {});

        // Get tokens to exclude
        const userTokens = JSON.parse(this.filteredTokens) || [];
        // Additional filtering before output
        this.listTokens = this.data.tokens.filter(
            asset => userTokens.findIndex(key => key === asset.key) === -1
        ).filter(filter => filter.name.toUpperCase() != 'TRX');

        // move "TRX" to the first position
        this.listTokens.unshift({
            'key': '0',  // default key
            'name': 'TRX',
            'value': this.wallet.balance
        });

        this.filteredListTokens = _.clone(this.listTokens);
        //Getting a list of contact addresses
        this.updateContactsList();
        this.onTokenChange();
    }

    /**
     * Update contact list
     *
     * @return void
     */
    private updateContactsList(): void
    {
        this.addressBookProvider.getAddressBooks()
            .then(ab => {
                this.hasContacts = !_.isEmpty(ab);
                if (!this.hasContacts) return;

                let contactsList = [];
                _.each(ab, (v, k: string) =>
                {
                    contactsList.push({
                        name: _.isObject(v) ? v.name : v,
                        address: k,
                        email: _.isObject(v) ? v.email : null,
                        recipientType: 'contact',
                        getAddress: () => Promise.resolve(k)
                    });
                });
                this.filteredContactsList = _.clone(contactsList);
            });
    }

    /**
     * Update parameters for token
     *
     * @return void
     */
    onTokenChange(): void {
        this.getTokenAmount()
    }

    /**
     * Choose an address from contacts
     *
     * @param {string} address - Address from contact
     * @return void
     */
    chooseAddress(address: string): void {
        if(!address) return null;
        this.fields.toAddress = address;
    }

    /**
     * Get token balance
     *
     * @return void
     */
    getTokenAmount(): void
    {
        let filter = this.listTokens.find(c =>
            c.key == this.fields.token
        );
        this.tokenBalance = (filter.name.toLowerCase() == 'trx' ? filter.value / 1e6 : filter.value);
        this.tokenName = (filter.name.toLowerCase() == 'trx' ? 'TRX' : filter.name)
    }

    /**
     * Sending the entire amount
     *
     * @return void
     */
    public sendMax(): void
    {
        this.useSendMax = true;
        let item = this.listTokens.find(c =>
                c.key == this.fields.token
            );

        if(this.fields.token == '0') {
            this.fields.amount = item.value / 1e6;
            this.processAmount('trx')
        } else {
            this.fields.amount = item.value;
        }
    }

    /**
     * Processing amount
     *
     * @param {string} type - type amount
     * @return void
     */
    processAmount(type: string): void
    {
        if(this.fields.token != '0') return;
        if(type == 'trx') {
            return this.alternativeAmount = (
                this.fiatCode.toLowerCase() != 'btc' ?
                    this.filterProvider.formatFiatAmount(
                        this.toFiat(this.fields.amount)
                    ):
                    this.toFiat(this.fields.amount)
            );
        }

        this.fields.amount = this.fromFiat(this.alternativeAmount)
    }

    /**
     * Convert amount to alternative currency
     *
     * @param {number} val - amount
     * @returns {number}
     */
    private toFiat(val: number): number
    {
        if (!this.rateProvider.getRate(this.fiatCode)) return undefined;

        return parseFloat(
            this.rateProvider
                .toFiat(
                    val * this.unitToSun,
                    this.fiatCode
                )
                .toFixed(8)
        );
    }

    /**
     * Convert amount from alternative currency
     *
     * @param {number} val - amount
     * @returns {number}
     */
    private fromFiat(val): number
    {
        return parseFloat((
                this.rateProvider.fromFiat(val, this.fiatCode) * this.sunToUnit
            ).toFixed(5)
        );
    }

    /**
     * Go to transaction confirmation
     *
     * @return void
     */
    public goToConfirm(): void
    {
        this.isButtonDisabled = true;
        this.walletProvider.createTx({
            tokenID: this.fields.token,
            amount: this.fields.amount,
            toAddress: this.fields.toAddress,
        }, this.wallet.address)
            .then(result => {
                this.signedTransaction = result;
                // confirmed data
                this.confirmDetails = {
                    id: result.txID,
                    timestamp: result.raw_data.timestamp,
                    type: result.raw_data.contract[0].type,
                    amount: result.raw_data.contract[0].parameter.value.amount,
                    toAddress: result.raw_data.contract[0].parameter.value.to_address,
                    ownerAddress: result.raw_data.contract[0].parameter.value.owner_address,
                    token: this.fields.token,
                    data: '~'
                };
                this.isButtonDisabled = false;
                this.isConfirmed = true;
            }).catch(err => {
            this.snackBar.open(err, null, {
                duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
            });
            this.isButtonDisabled = false;
        })
    }

    /**
     * Confirm and send transactions to the network
     *
     * @return void
     */
    public submitTransaction()
    {
        this.isButtonDisabled = true;
        this.isConfirmed = true;
        this.walletProvider.signTx(this.signedTransaction)
            .then(signed => {
                this.walletProvider.broadcastTx(signed)
                    .then(broadcast => {
                        // If the transaction is successfully sent to the network
                        if(broadcast.result == true) {
                            this.walletProvider.fullUpdateAccount(this.wallet.address).then(() => {});

                            this.isButtonDisabled = false;
                            this.isSuccess = true;
                            setTimeout(() => {
                                this.isTransactionInfo = true;
                            }, 2000)
                        }
                    })
            })
            .catch(err => {
                this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
            });
    }

    /**
     * Search handler
     *
     * @param {any} event - event search
     * @return void
     */
    public getItems(event: any): void
    {
        // set val to the value of the searchbar
        let val = event.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            let result = _.filter(this.listTokens, item => {
                let name = item['name'];
                return _.includes(name.toLowerCase(), val.toLowerCase());
            });
            this.filteredListTokens = result;
        } else {
            // Reset items back to all of the items
            this.filteredListTokens = this.listTokens;
        }
    }

    /**
     * Clear Search Tokens
     *
     * @return void
     */
    clearFilter(): void {
        this.filterSearch = '';
        this.filteredListTokens = this.listTokens;
    }

    /**
     * Sent button status
     *
     * @return boolean
     */
    enabledSend(): boolean
    {
        return this.isButtonDisabled == true ||
            !this.addressProvider.validateAddress(this.fields.toAddress) ||
            this.fields.amount == 0 ||
            this.fields.amount > this.tokenBalance
    }

    /**
     * Come back
     *
     * @return void
     */
    onBack(): void {
        this.isConfirmed = false;
    }

    /**
     * Close modal
     *
     * @return void
     */
    onClose(): void {
        this.dialogRef.close();
    }
}
