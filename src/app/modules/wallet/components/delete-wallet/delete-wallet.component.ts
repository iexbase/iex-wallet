/*
 * ---------------------------------------------------------------------------------------------
 *  Copyright (c) iEXBase. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */

import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";

// LocalStorage
import { LocalStorage } from "ngx-webstorage";

// Redux
import * as WalletActions from "@redux/wallet//wallet.actions";
import * as fromWallet from "@redux/wallet/wallet.reducer";

// Providers
import {WalletProvider} from "@providers/wallet/wallet";

@Component({
    selector: 'delete-wallet',
    templateUrl: './delete-wallet.component.html',
    styleUrls: ['./delete-wallet.component.scss'],
})
export class DeleteWalletComponent
{
    /**
     * Active account
     *
     * @var string
     */
    @LocalStorage()
    activeAccount: string;

    /**
     * Object creation DeleteWalletComponent
     *
     * @param {MatDialogRef} dialogRef - Dialog service
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive provider
     * @param {Router} router - Router service
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<DeleteWalletComponent>,
        private walletProvider: WalletProvider,
        private store: Store<fromWallet.State>,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        //
    }


    /**
     *  Deleting an account
     *
     *  @return void
     */
    deleteWallet(): void
    {
        // Get information about a deleted account
        let wallet = this.walletProvider.getWallet(this.data.address);
        this.walletProvider.deleteWallet(this.data.address)
            .then(() => {
                this.store.dispatch(
                    new WalletActions.DeleteWallet({
                        id: wallet.id
                    })
                );
                this.activeAccount = '';

                // Redirect to wallet page
                this.router.navigate(['/wallet']);
                this.onClose();
            });
    }

    /**
     * Close modal
     *
     * @return void
     */
    onClose(): void {
        this.dialogRef.close()
    }
}
