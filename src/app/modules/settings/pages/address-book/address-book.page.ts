/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, OnInit} from '@angular/core';
import {AddressBookProvider} from '@providers/address-book/address-book';

import {MatDialog, MatSnackBar} from '@angular/material';
import {AddContactComponent} from '@modules/settings/components/add-contact/add-contact.component';
import {EditContactComponent} from '@modules/settings/components/edit-contact/edit-contact.component';
import * as _ from 'lodash';

@Component({
    selector: 'address-book-page',
    templateUrl: './address-book.page.html',
    styleUrls: ['./address-book.page.scss'],
})
export class AddressBookPage implements OnInit {
    /**
     * Address Book List
     *
     * @var object[]
     */
    public addressbook: object[] = [];

    /**
     * Filtered Address List
     *
     * @var object[]
     */
    public filteredAddressbook: object[] = [];

    /**
     * Empty address list
     *
     * @var boolean
     */
    public isEmptyList: boolean;

    /**
     *  Object creation AddressBookPage
     *
     *  @param {AddressBookProvider} addressbookProvider - Address Book provider
     *  @param {MatDialog} dialog - Service to open Material Design modal dialogs.
     *  @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        public addressbookProvider: AddressBookProvider,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.initAddressbook();
    }

    /**
     * Prepare an address book array
     *
     * @return void
     */
    private initAddressbook(): void {
        this.addressbookProvider
            .getAddressBooks()
            .then(addressBook => {
                this.isEmptyList = _.isEmpty(addressBook);

                const contacts: object[] = [];
                _.each(addressBook, (contact, k: string) => {
                    contacts.push({
                        name: _.isObject(contact) ? contact.name : contact,
                        email: _.isObject(contact) ? contact.email : null,
                        address: k
                    });
                });
                this.addressbook = _.clone(contacts);
                this.filteredAddressbook = _.clone(this.addressbook);
            });
    }

    /**
     * Add new contact
     *
     * @return void
     */
    addEntry(): void {
        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '650px',
            panelClass: ['dialog-background']
        });

        dialogRef.afterClosed().subscribe(() => {
            this.initAddressbook();
        });
    }

    /**
     * Edit contact
     *
     * @return void
     */
    editEntry(item: any): void {
        const dialogRef = this.dialog.open(EditContactComponent, {
            width: '650px',
            panelClass: ['dialog-background'],
            data: item
        });

        dialogRef.afterClosed().subscribe(() => {
            this.initAddressbook();
        });
    }

    /**
     * Delete contract
     *
     * @param {string} address - Tron address
     * @return void
     */
    deleteEntry(address: string): void {
        this.addressbookProvider.remove(address).then(() => {
            this.snackBar.open('Address Successfully deleted', null, {
                duration: 2000,
                panelClass: ['snackbar-theme-dialog']
            });
            this.initAddressbook();
        });
    }

    /**
     * Search handler
     *
     * @param {any} event - event search
     * @return void
     */
    public getItems(event: any): void {
        // set val to the value of the searchbar
        const val = event.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            const result = _.filter(this.addressbook, item => {
                const name = item['name'];
                return _.includes(name.toLowerCase(), val.toLowerCase());
            });
            this.filteredAddressbook = result;
        } else {
            // Reset items back to all of the items
            this.initAddressbook();
        }
    }
}
