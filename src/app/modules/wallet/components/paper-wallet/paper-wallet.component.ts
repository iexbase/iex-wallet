/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, Input} from "@angular/core";
import {MatDialog, MatSnackBar} from "@angular/material";

// Providers
import { WalletProvider } from "@providers/wallet/wallet";

// Components
import { TransferAssetComponent } from "../transfer-asset/transfer-asset.component";
import { FreezeBalanceComponent } from "../freeze-balance/freeze-balance.component";
import { ReceiveAccountComponent } from "../receive-account/receive-account.component";

@Component({
    selector: 'paper-wallet',
    templateUrl: './paper-wallet.component.html',
    styleUrls: ['./paper-wallet.component.scss'],
})
export class PaperWalletComponent
{
    /**
     * Get scrolling status
     *
     * @var boolean
     */
    @Input()
    header: boolean;

    /**
     * Wallet details
     *
     * @var any
     */
    @Input()
    wallet: any;

    /**
     * Get alternative currency code
     *
     * @var string
     */
    @Input()
    altCode: string;

    /**
     * Status hover update
     *
     * @var boolean
     */
    enabledOn: boolean = false;

    /**
     * Object creation PaperWalletComponent
     *
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {MatDialog} dialog - Service to open Material Design modal dialogs.
     * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        private walletProvider: WalletProvider,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        //
    }

    /**
     *  Update wallet id
     *
     *  @return void
     */
    updateWallet(): void
    {
        this.walletProvider.fullUpdateAccount(this.wallet.address).then(() => {});

        this.snackBar.open('Account updated successfully', null, {
            duration: 2000,
            panelClass: ['snackbar-theme-dialog']
        })
    }

    /**
     * Open transfer window
     *
     * @return void
     */
    transferModal(): void
    {
        const dialogRef = this.dialog.open(TransferAssetComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Open receive address window
     *
     * @return void
     */
    receiveModal(): void
    {
        const dialogRef = this.dialog.open(ReceiveAccountComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Open freeze balance window
     *
     * @return void
     */
    freezeModal(): void
    {
        const dialogRef = this.dialog.open(FreezeBalanceComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(() => {});
    }
}
