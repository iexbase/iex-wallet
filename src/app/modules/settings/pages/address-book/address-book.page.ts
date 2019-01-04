import {Component, OnInit} from "@angular/core";
import {LocalStorage} from "ngx-webstorage";
import {AddressBookProvider} from "@providers/address-book/address-book";

import * as _ from 'lodash';
import {MatDialog, MatSnackBar} from "@angular/material";
import {AddContactComponent} from "@modules/settings/components/add-contact/add-contact.component";

@Component({
    selector: 'address-book-page',
    templateUrl: './address-book.page.html',
    styleUrls: ['./address-book.page.scss'],
})
export class AddressBookPage implements OnInit
{
    /**
     *  Active page in settings
     *
     *  @var string
     */
    @LocalStorage()
    settingsView: string;

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
        // Active this page
        this.settingsView = 'address-book';
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
    private initAddressbook(): void
    {
        let handlerBook = this.addressbookProvider.getAddressBooks();
        this.isEmptyList = _.isEmpty(handlerBook);

        let contacts: object[] = [];
        _.each(handlerBook, (contact, k: string) =>
        {
            contacts.push({
                id: k,
                name: _.isObject(contact) ? contact.name : contact,
                email: _.isObject(contact) ? contact.email : null,
                address: contact.address
            });
        });
        this.addressbook = _.clone(contacts);
        this.filteredAddressbook = _.clone(this.addressbook);
    }

    /**
     * Add new contact
     *
     * @return void
     */
    addEntry(): void
    {
        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '650px',
            panelClass: ['dialog-background']
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
    deleteEntry(address: string): void
    {
        this.addressbookProvider.remove(address).then(() => {
            this.snackBar.open('Address Successfully deleted', null, {
                duration: 2000,
                panelClass: ['snackbar-theme-dialog']
            });
            this.initAddressbook()
        });
    }
}
