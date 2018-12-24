/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { Store } from "@ngrx/store";

// Redux
import { AppState } from "@redux/index";

// Providers
import { BackupProvider } from "@providers/backup/backup";
import { ElectronProvider } from "@providers/electron/electron";
import { Logger } from "@providers/logger/logger";
import { WalletProvider } from "@providers/wallet/wallet";

@Component({
    selector: 'export-wallet',
    templateUrl: './export-wallet.component.html',
    styleUrls: ['./export-wallet.component.scss'],
})
export class ExportWalletComponent implements OnInit
{
    public wallet;
    public password: string;
    public isNotIncludePrivateKey: boolean = false;

    /**
     * Object creation ExportWalletComponent
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     * @param {WalletProvider} walletProvider - Wallet provider
     * @param {Store} store - Reactive provider
     * @param {MatSnackBar} snackBar - Snack bar service
     * @param {ElectronProvider} electron - Electron provider
     * @param {Logger} logger - Log provider
     * @param {BackupProvider} backup - Backup provider
     * @param {any} data - Additional parameters received
     */
    constructor(
        public dialogRef: MatDialogRef<ExportWalletComponent>,
        private walletProvider: WalletProvider,
        protected store: Store<AppState>,
        private snackBar: MatSnackBar,
        private electron: ElectronProvider,
        private logger: Logger,
        private backup: BackupProvider,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.logger.info('Loaded: ExportWalletComponent');
        this.wallet = this.walletProvider.getWallet(this.data.address);
    }

    /**
     * Download wallet backup in JSON format
     *
     * @return void
     */
    downloadJSON(): void
    {
        this.backup.walletDownload(this.walletProvider.password, {
            privateKey: (!this.isNotIncludePrivateKey)
        }, this.data.address).then(() => {})
    }

    /**
     * Clipboard backup wallet data
     *
     * @return void
     */
    goToClipboard(): void
    {
        this.backup.walletBackup(this.walletProvider.password, {
            privateKey: (!this.isNotIncludePrivateKey)
        }, this.data.address).then(result =>
        {
            this.electron.writeToClipboard(JSON.stringify(result));
            this.snackBar.open('Data copied', null,{
                duration: 2000
            })
        })
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
