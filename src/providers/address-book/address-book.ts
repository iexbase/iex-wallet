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
    public getAddressBooks(): AddressBookInterface[]
    {
        // In case storage is empty, create an empty array
        if(!this.addressBook)
            this.addressBook = JSON.stringify([]); // default data

        if(this.addressBook && _.isString(this.addressBook))
            return JSON.parse(this.addressBook) || [];

        return []; // As addition
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
            let findData = this.getAddressBooks().find(c => c.address == address);
            // If no data is found at the address,
            // we generate an error and leave the process
            if(!findData) reject('Contact not found');

            return resolve(findData)
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
            if(this.hasAddressBook(entry.address)) {
                return reject('Entry already exist');
            }

            // If there are no errors, add a new contact to the list.
            this.addressBook = JSON.stringify(
                this.getAddressBooks().push(entry)
            );
            return resolve(entry);
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
        return new Promise((resolve, reject) =>
        {
            // Validate Tron address
            if(!this.addressProvider.validateAddress(address))
                return reject('Invalid Tron address');

            // Check if there are any contacts in the list.
            if(_.isEmpty(this.getAddressBooks()))
                return reject('Addressbook is empty');

            // Check if the address exists in the list
            if(!this.hasAddressBook(address))
                return reject('Entry does not exist');

            // Exclude remote address from list
            let updatedAddressBook = this.getAddressBooks().filter(
                filter => filter.address != address
            );

            this.addressBook = JSON.stringify(updatedAddressBook);
            return resolve(this.getAddressBooks());
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
            this.addressBook = JSON.stringify([]);
        });
    }

    /**
     * Address Book check at
     *
     * @param {string} address - tron address
     * @returns {boolean}
     */
    hasAddressBook(address: string): boolean
    {
        return this.getAddressBooks().some(
            filter => filter.address === address
        )
    }
}
