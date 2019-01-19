/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

// Providers
import {WalletProvider} from '@providers/wallet/wallet';

@Component({
    selector: 'signed-message',
    templateUrl: './signed-message.component.html',
    styleUrls: ['./signed-message.component.scss'],
})
export class SignedMessageComponent implements OnInit {
    /**
     * Source text
     *
     * @var string
     */
    messageSigned: string;

    /**
     * Signed message
     *
     * @var string
     */
    encryptedData: string;

    /**
     * Address signed
     *
     * @var string
     */
    accountAddress: string = null;

    /**
     * Create a new SignedMessageComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<SignedMessageComponent>,
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
     * Sign the message in the printing process
     *
     * @return void
     */
    encryptedMessage(): void {
        this.handler();
    }

    /**
     * Handler signature
     *
     * @return void
     */
    handler(): void {
        if (this.messageSigned && this.messageSigned.startsWith(' ', 1) == false &&  this.messageSigned.length > 1) {
            this.walletProvider.signTx(this.messageSigned).then(result => {
                this.encryptedData = result;
            });
            return;
        }
        this.encryptedData = '';
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
