/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DeleteWalletComponent} from '@modules/wallet/components/delete-wallet/delete-wallet.component';
import {ExportWalletComponent} from '@modules/wallet/components/export-wallet/export-wallet.component';
import {PreferencesComponent} from '@modules/wallet/components/preferences/preferences.component';
import {SignedMessageComponent} from '@modules/wallet/components/signed-message/signed-message.component';

@Component({
    selector: 'wallet-settings',
    templateUrl: './wallet-settings.component.html',
    styleUrls: ['./wallet-settings.component.scss'],
})
export class WalletSettingsComponent {

    @Input()
    wallet: any;

    /**
     * Object creation PaperWalletComponent
     */
    constructor(
        public dialog: MatDialog,
    ) {
        //
    }

    /**
     * Open settings window
     *
     * @return void
     */
    preferenceWallet(): void {
        const dialogRef = this.dialog.open(PreferencesComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Open backup wallet window
     *
     * @return void
     */
    exportWalletModal(): void {
        const dialogRef = this.dialog.open(ExportWalletComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Open signed message window
     *
     * @return void
     */
    signedMessageModal(): void {
        const dialogRef = this.dialog.open(SignedMessageComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Open delete wallet window
     *
     * @return void
     */
    deleteWalletModal(): void {
        const dialogRef = this.dialog.open(DeleteWalletComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(() => {});
    }
}
