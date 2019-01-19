/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

// Validators
import { AddressValidator } from '@validators/address';

// Providers
import { AddressBookProvider } from '@providers/address-book/address-book';
import { AddressProvider } from '@providers/address/address';
import { Logger } from '@providers/logger/logger';

// Modules
import { AddressBookPage } from '@modules/settings/pages/address-book/address-book.page';
import {AppProvider} from '@providers/app/app';

@Component({
    selector: 'add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
    /**
     * Create a form group
     *
     * @var FormGroup
     */
    addressBookAdd: FormGroup;

    /**
     * Project name
     *
     * @var string
     */
    public appName: string;

    /**
     * Object creation AddContactComponent
     *
     * @param {MatDialogRef} dialogRef - Reference to a dialog opened via the MatDialog service
     * @param {AppProvider} appProvider - App provider
     * @param {AddressBookProvider} addressBookProvider - Address book provider
     * @param {AddressProvider} addressProvider - Address provider
     * @param {FormBuilder} formBuilder - Creates an `AbstractControl` from a user-specified configuration.
     * @param {Logger} logger - Log provider
     * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        public dialogRef: MatDialogRef<AddressBookPage>,
        private appProvider: AppProvider,
        public addressBookProvider: AddressBookProvider,
        public addressProvider: AddressProvider,
        private formBuilder: FormBuilder,
        private logger: Logger,
        private snackBar: MatSnackBar
    ) {
        // configure
        this.addressBookAdd = this.formBuilder.group({
            name: [
                '',
                Validators.compose([Validators.minLength(1), Validators.required])
            ],
            email: ['', this.emailOrEmpty],
            address: [
                '',
                Validators.compose([
                    Validators.required,
                    new AddressValidator(this.addressProvider).isValid
                ])
            ]
        });
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.logger.info('Loaded: AddressbookAddPage');
        this.appName = this.appProvider.info.nameCase;
    }

    /**
     * Validate Email field
     *
     * @param {AbortController} control - This is the base class for `FormControl`
     * @returns {ValidationErrors | null}
     */
    private emailOrEmpty(control: AbstractControl): ValidationErrors | null {
        return control.value === '' ? null : Validators.email(control);
    }

    /**
     * Add a new contact to the list
     *
     * @return void
     */
    save(): void {
        this.addressBookAdd.controls['address'].setValue(
            this.parseAddress(this.addressBookAdd.value.address)
        );

        this.addressBookProvider.add(this.addressBookAdd.value)
            .then(() => {
                this.onClose();
            })
            .catch(err => {
                this.snackBar.open(err, null, {
                    duration: 2000
                });
            });

    }

    /**
     * Remove unnecessary values
     *
     * @param {string} str - tron address
     * @returns {string}
     */
    private parseAddress(str: string): string {
        return this.addressProvider.extractAddress(str);
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
