/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Inject, OnInit} from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";

// Validators
import { AddressValidator } from "@validators/address";

// Providers
import { Logger } from "@providers/logger/logger";
import { AddressProvider } from "@providers/address/address";
import { AddressBookProvider } from "@providers/address-book/address-book";

// Modules
import { AddressBookPage } from "@modules/settings/pages/address-book/address-book.page";

@Component({
    selector: 'edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit
{
    /**
     * Create a form group
     *
     * @var FormGroup
     */
    addressBookEdit: FormGroup;

    /**
     * Object creation EditContactComponent
     *
     * @param {MatDialogRef} dialogRef - Reference to a dialog opened via the MatDialog service
     * @param {AddressBookProvider} addressBookProvider - Address book provider
     * @param {AddressProvider} addressProvider - Address provider
     * @param {FormBuilder} formBuilder - Creates an `AbstractControl` from a user-specified configuration.
     * @param {Logger} logger - Log provider
     * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     * @param {any} data - Contact Details
     */
    constructor(
        public dialogRef: MatDialogRef<AddressBookPage>,
        public addressBookProvider: AddressBookProvider,
        public addressProvider: AddressProvider,
        private formBuilder: FormBuilder,
        private logger: Logger,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        // configure
        this.addressBookEdit = this.formBuilder.group({
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

        this.addressBookEdit.controls['email'].setValue(data.email);
        this.addressBookEdit.controls['name'].setValue(data.name);
        this.addressBookEdit.controls['address'].setValue(data.address);
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.logger.info('Loaded: AddressbookEditPage');
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
    save(): void
    {
        this.addressBookProvider.edit(this.addressBookEdit.value)
            .then(() => {
                this.onClose();
            })
            .catch(err => {
                this.snackBar.open(err, null, {
                    duration: 2000
                })
            });

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
