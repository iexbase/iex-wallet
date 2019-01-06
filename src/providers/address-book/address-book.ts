import { Injectable } from "@angular/core";
import { LocalStorage } from "ngx-webstorage";

// Lodash
import * as _ from 'lodash';

// Providers
import { Logger } from "@providers/logger/logger";
import { AddressProvider } from "@providers/address/address";


// Interface Address Book
export interface AddressBookInterface {
    name: string;
    email: string;
    address: string;
}

@Injectable()
export class AddressBookProvider
{
    /**
     * Contact Store
     *
     * @var string
     */
    @LocalStorage()
    public addressBook: string;

    /**
     * Object creation AddressBookProvider
     *
     * @param {Logger} logger - Logger
     * @param {AddressProvider} addressProvider - Address provider
     */
    constructor(
        private logger: Logger,
        private addressProvider: AddressProvider
    ) {
        this.logger.debug('AddressBookProvider initialized');
    }

    /**
     * List of all contacts
     *
     * @returns {AddressBookInterface} list contracts
     */
    public getAddressBooks(): Promise<any>
    {
        return new Promise((resolve) => {
            // In case storage is empty, create an empty array
            if(!this.addressBook)
                this.addressBook = JSON.stringify([]); // default data

            if(this.addressBook && _.isString(this.addressBook))
                return resolve(JSON.parse(this.addressBook) || {});

            return resolve({}); // As addition
        })
    }

    /**
     * Get the contact name at
     *
     * @param {string} address - Tron address
     *
     * @returns {Promise} find details
     */
    public get(address: string): Promise<AddressBookInterface>
    {
        return new Promise((resolve, reject) =>
        {
            this.getAddressBooks().then(ab => {
                if (ab && ab[address])
                    return resolve(ab[address]);

            }).catch(() => {
                return reject();
            });
        });
    }

    /**
     * Add new contact
     *
     * @param {AddressBookInterface} entry - data to add
     * @returns {Promise} details of the added contact
     */
    public add(entry: AddressBookInterface): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            // Validate TRON Address
            if(!this.addressProvider.validateAddress(entry.address))
                return reject('Invalid Tron address');

            // Check if the address exists in the contact list
            this.getAddressBooks()
                .then(ab => {
                    if(ab[entry.address])
                        return reject('Entry already exist');

                    // Add a new address to the list
                    ab[entry.address] = entry;
                    this.addressBook = JSON.stringify(ab);

                    resolve(entry);
                });
        });
    }

    /**
     * Delete contact at
     *
     * @param {string} address - tron address
     * @returns {Promise} all contacts
     */
    remove(address: string): Promise<AddressBookInterface[]>
    {
        return new Promise((resolve, reject) => {
            // Validate Tron address
            if(!this.addressProvider.validateAddress(address))
                return reject('Invalid Tron address');

            this.getAddressBooks()
                .then(ab =>
                {
                    // Check if there are any contacts in the list.
                    if(_.isEmpty(ab))
                        return reject('Addressbook is empty');

                    // Check if the address exists in the list
                    if(!ab[address])
                        return reject('Entry does not exist');

                    // Exclude remote address from list
                    delete ab[address];

                    this.addressBook = JSON.stringify(ab);
                    return resolve(ab)
                }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     *  Delete all contact details
     *
     *  @returns {Promise} - return empty data
     */
    public removeAll(): Promise<any>
    {
        return new Promise(() => {
            this.addressBook = JSON.stringify({});
        });
    }
}
