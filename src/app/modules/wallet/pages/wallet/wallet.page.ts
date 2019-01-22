/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, HostListener, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { LocalStorage } from 'ngx-webstorage';
import {Observable} from 'rxjs';

// Redux
import * as fromWallet from '@redux/wallet/wallet.reducer';

// Env
import env from '../../../../../environments';

// Providers
import {FreezeBalanceComponent} from '@modules/wallet/components/freeze-balance/freeze-balance.component';
import {ReceiveAccountComponent} from '@modules/wallet/components/receive-account/receive-account.component';
import {TransferAssetComponent} from '@modules/wallet/components/transfer-asset/transfer-asset.component';
import {Update} from '@ngrx/entity';
import {AddressBookProvider} from '@providers/address-book/address-book';
import { ConfigProvider } from '@providers/config/config';
import { ElectronProvider } from '@providers/electron/electron';
import {Logger} from '@providers/logger/logger';
import { WalletProvider } from '@providers/wallet/wallet';
import * as WalletActions from '@redux/wallet/wallet.actions';

@Component({
    selector: 'wallet-page',
    templateUrl: './wallet.page.html',
    styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
    /**
     * Selected account
     *
     * @var string
     */
    @LocalStorage()
    activeAccount: string;

    /**
     * All wallets
     *
     * @var any[]
     */
    wallets: Observable<any[]>;

    /**
     * Check if wallets exist
     *
     * @var boolean
     */
    isEmptyWallet: boolean;

    /**
     * Hide part of the header
     *
     * @var boolean
     */
    miniHeader  = false;

    /**
     * Wallet detail
     *
     * @var any
     */
    wallet: any = {
        color: null as string
    };

    /**
     * Scrolling Activity Status
     *
     * @var boolean
     */
    public scrollDisabled: boolean;

    /**
     * Current page
     *
     * @var number
     */
    private currentPage: number;

    /**
     * Count all transaction
     *
     * @var number
     */
    public totalTransaction: number;

    /**
     * List transactions
     *
     * @var any[]
     */
    public transactions = [];

    /**
     * List address book
     *
     * @var any
     */
    public addressbook = {};

    /**
     * Status loading
     *
     * @var boolean
     */
    isLoading = false;

    /**
     * Wallet opening
     *
     * @var boolean
     */
    private primaryWalletOpening = false;

    /**
     * Status hover update
     *
     * @var boolean
     */
    enabledOn = false;

    /**
     * Create a new PreferencesComponent object
     *
     * @param {Store} store - Reactive service
     * @param {MatDialog} dialog - Service can be used to open modal dialogs
     * @param {WalletProvider} walletProvider - Wallet Provider
     * @param {ConfigProvider} config - Config provider
     * @param {ElectronProvider} electronProvider - Electron provider
     * @param {AddressBookProvider} addressBookProvider - Address Book provider
     * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     * @param {Logger} logger - Log provider
     */
    constructor(
        private store: Store<fromWallet.State>,
        public dialog: MatDialog,
        public walletProvider: WalletProvider,
        public config: ConfigProvider,
        private electronProvider: ElectronProvider,
        private addressBookProvider: AddressBookProvider,
        private snackBar: MatSnackBar,
        private logger: Logger
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {

        // List all accounts
        this.wallets = this.store.pipe(select(fromWallet.selectAllWallets));
        // Check the presence of the recorded wallet
        // and activates the cached wallet
        this.wallets.subscribe((data: any[]) =>
        {
            this.isEmptyWallet = _.isEmpty(data);

            // From the array, select the required
            const selected = data.filter(
                selected => selected.address == this.activeAccount || null);

            // If the array is not empty
            if (selected[0] && !_.isEmpty(selected)) {
                (this.primaryWalletOpening == false ?
                    this.openWalletDetails(selected[0], true) :
                    this.wallet = selected[0]);
            }
        });

        // Initializing the address book list
        this.addressBookProvider
            .getAddressBooks()
            .then(ab => {
                this.addressbook = ab;
            }).catch(err => {
                this.logger.error(err);
        });
    }

    /**
     * On scrolling
     *
     * @return void
     */
    @HostListener('scroll', ['$event'])
    public onScroll($event: Event): void {
        this.miniHeader = $event.srcElement.scrollTop > 200;
    }

    /**
     * Account change
     *
     * @param {any} item - wallet id
     * @param {boolean} hidden - multi update
     * @return void
     */
    openWalletDetails(item: any, hidden: boolean = false): void | boolean
    {
        this.wallet = item;
        // Exclude the possibility of updating the same wallet
        if (this.wallet.address == this.activeAccount && hidden == false) {
            return false;
        }

        this.activeAccount = this.wallet.address;
        this.primaryWalletOpening = true;
        this.walletProvider.fullUpdateAccount(item.address).then(() => {});

        this.transactions = [];
        this.currentPage = 0;
        this.totalTransaction = 0;
        this.isLoading = true;

        this.activeAccount = this.wallet.address;
        this.scrollDisabled = false;
        this.getTransactions(this.currentPage, (items: any) => {
            this.transactions = this.transactions.concat(items.res);
            this.isLoading = false;
        });
    }

    /**
     * We load new transactions when scrolling
     *
     * @return void
     */
    public onScrollDown(): void {
        this.getTransactions(this.currentPage, (items: any) => {
            this.transactions = this.transactions.concat(items.res);
        });
    }

    /**
     * Get wallet transactions by address
     *
     * @param {number} page - page
     * @param {any} saveResultsCallback - callback result
     * @return void
     */
    private getTransactions(page: number = 0, saveResultsCallback: (items: any) => void) {
        this.walletProvider.getTxsFromServer({
            address: this.wallet.address,
            limit: 20,
            start: page,
            total: this.totalTransaction
        }).then((data: any) => {
                this.currentPage += 20;
                this.totalTransaction = data['total'];

                saveResultsCallback(data);
            });
    }

    /**
     * Show and hide balance
     *
     * @return void
     */
    toggleBalance() {
        this.wallet.balanceHidden = !this.wallet.balanceHidden;
        this.walletProvider.toggleHideBalanceFlag(this.wallet.address, this.wallet.balanceHidden)
            .then(wallet => {
                // Parameters for update
                const update: Update<any> = {
                    id: wallet.id,
                    changes: { balanceHidden: wallet.balanceHidden }
                };

                this.store.dispatch(
                    new WalletActions.UpdateWallet({ wallet: update})
                );
            });
    }

    /**
     *  Update wallet id
     *
     *  @return void
     */
    updateWallet(): void {
        this.walletProvider.fullUpdateAccount(this.wallet.address).then(() => {

            this.currentPage = 0;
            // this.transactions = [];
            this.getTransactions(this.currentPage, (items: any) => {
                this.transactions = items.res;
                this.isLoading = false;
            });

        });

        this.snackBar.open('Account updated successfully', null, {
            duration: 2000,
            panelClass: ['snackbar-theme-dialog']
        });
    }

    /**
     * Open transfer window
     *
     * @return void
     */
    transferModal(): void {
        const dialogRef = this.dialog.open(TransferAssetComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: {
                ...this.wallet,
                altCode: this.config.get('wallet.settings.alternativeIsoCode')
            }
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Open receive address window
     *
     * @return void
     */
    receiveModal(): void {
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
    freezeModal(): void {
        const dialogRef = this.dialog.open(FreezeBalanceComponent, {
            width: '650px',
            panelClass: ['dialog-background', this.wallet.color],
            data: this.wallet
        });
        dialogRef.afterClosed().subscribe(() => {});
    }

    /**
     * Open link in browser
     *
     * @return boolean
     */
    openExternalLink(url: string, type: string): boolean {
        return this.electronProvider.openExternalLink((`${env.explorer.url}/${type}/${url}`));
    }
}
