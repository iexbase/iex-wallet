/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

// Redux
import * as WalletActions from "@redux/wallet/wallet.actions";
import * as fromWallet from "@redux/wallet/wallet.reducer";


// Providers
import { WalletProvider } from "@providers/wallet/wallet";

// Interface colors
export interface TronColorInterface {
    id: number;
    name: string;
    color: string;
    class: string;
}

@Component({
    selector: 'preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit
{
    /**
     * List of all available colors
     *
     * @var any[]
     */
    public colorsList: TronColorInterface[] = [
        {'id': 0, 'name': 'Thunderbird', 'color': '#d11b12', 'class': 'theme-wallet-thunderbird'},
        {'id': 1, 'name': 'Cornflower Blue', 'color': '#647ce8', 'class': 'theme-wallet-cornflower-blue'},
        {'id': 2, 'name': 'Celery', 'color': '#99C361', 'class': 'theme-wallet-celery'},
        {'id': 3, 'name': 'Corn', 'color': '#ebbf09', 'class': 'theme-wallet-corn'},
        {'id': 4, 'name': 'Blue Violet', 'color': '#5D69BD' , 'class': 'theme-wallet-blue-violet'},
        {'id': 5, 'name': 'Terracotta', 'color': '#E58268', 'class': 'theme-wallet-terracotta'},
        {'id': 6, 'name': 'Silver Chalice', 'color': '#AEAEAE', 'class': 'theme-wallet-silver-chalice'},
        {'id': 7, 'name': 'Cerise', 'color': '#DC2C7E', 'class': 'theme-wallet-cerise'},
        {'id': 8, 'name': 'Emerald', 'color': '#58CD87', 'class': 'theme-wallet-emerald'},
        {'id': 9, 'name': 'Fuchsia Blue', 'color': '#973CC1', 'class': 'theme-wallet-fuchsia-blue'},
        {'id': 10, 'name': 'Tulip Tree', 'color': '#EEAF4A', 'class': 'theme-wallet-tulip-tree'},
        {'id': 11, 'name': 'Maroon Flush', 'color': '#CE235B', 'class': 'theme-wallet-maroon-flush'},
        {'id': 12, 'name': 'Waikawa Gray', 'color': '#5B789E', 'class': 'theme-wallet-waikawa-gray'},
        {'id': 13, 'name': 'Turquoise', 'color': '#26CFD2', 'class': 'theme-wallet-turquoise'},
        {'id': 14, 'name': 'Tan Hide', 'color': '#FC8B59', 'class': 'theme-wallet-tan-hide'},
        {'id': 15, 'name': 'Dull Lavender', 'color': '#99A4EA', 'class': 'theme-wallet-dull-lavender'}
    ];

    /**
     * Wallet name
     *
     * @var string
     */
    public walletName: string;

    /**
     * Information on the selected color
     *
     * @var any
     */
    public colorIndex: any;

    /**
     * Create a new PreferencesComponent object
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
     * @param {Store} store - Reactive service
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<PreferencesComponent>,
        private walletProvider: WalletProvider,
        public snackBar: MatSnackBar,
        private store: Store<fromWallet.State>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit()
    {
        // Account Information
        let getWallet = this.walletProvider.getWallet(this.data.address);
        this.walletName = getWallet.name;

        // Select the previously recorded color
        this.colorIndex = this.colorsList.find(
            filter => filter.class === getWallet.color
        ) || {};
    }

    /**
     * Update account settings
     *
     * @return void
     */
    updateSettings(): void
    {
        this.walletName = this.defaultWalletName();
        this.walletProvider.updateWallet(this.data.address, {
            name: this.walletName,
            color: this.colorIndex.class
        }).then(result =>
        {
            // Parameters for update
            const update: Update<any> = {
                id: result.id,
                changes: {
                    name: result.name,
                    color: result.color
                }
            };

            this.store.dispatch(
                new WalletActions.UpdateWallet({ wallet: update})
            );

            this.snackBar.open('Data successfully updated',
                null, {
                    duration: 2000,
                    panelClass: ['snackbar-theme-dialog', 'custom-width'],
                });
        });
    }

    /**
     * Button activity status
     *
     * @return boolean
     */
    disabledButton(): boolean {
        return (!this.walletName && this.walletName.length == 0)
    }

    /**
     * Close modal
     *
     * @return void
     */
    onClose(): void {
        this.dialogRef.close();
    }

    /**
     * Set default name
     *
     * @return string
     */
    private defaultWalletName(): string {
        return (this.walletName && this.walletName.length > 1 ? this.walletName : 'Default wallet')
    }
}
