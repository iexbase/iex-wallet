/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

import {SignedMessageComponent} from '../signed-message/signed-message.component';

// Providers
import {WalletProvider} from '@providers/wallet/wallet';

@Component({
    selector: 'verify-message',
    templateUrl: './verify-message.component.html',
    styleUrls: ['./verify-message.component.scss'],
})
export class VerifyMessageComponent implements OnInit {
    /**
     * Tron address
     *
     * @var string
     */
    accountAddress: string = null;

    /**
     * Signature hash
     *
     * @var string
     */
    verifySignature: string;

    /**
     * Source text
     *
     * @var string
     */
    verifyMessage: string;

    /**
     * Confirmation Status
     *
     * @var boolean
     */
    verifiedSignature = false;

    /**
     * Status active button
     *
     * @var boolean
     */
    isButton = false;

    /**
     * Create a new PreferencesComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<SignedMessageComponent>,
        private snackBar: MatSnackBar,
        private walletProvider: WalletProvider,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.accountAddress = this.data.address;
    }

    /**
     * After clicking, check the entered data
     *
     * @return void
     */
    checkVerify(): void {
        this.isButton = true;
        try {
            this.walletProvider.verifySignature({
                message: this.verifyMessage,
                signature: this.verifySignature,
                address: this.accountAddress
            }).then(result => {

                this.verifiedSignature = result;
            }).catch(err => {

                this.verifiedSignature = false;
                this.snackBar.open(err, null, {
                    duration: 2000, panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
            });
        } catch (e) {
            this.verifiedSignature = false;
        }
    }

    /**
     * Button activation status
     *
     * @return boolean
     */
    isDisabled(): boolean {
        return (
            (!this.verifySignature || !this.verifyMessage || !this.accountAddress)
        );
    }
}
