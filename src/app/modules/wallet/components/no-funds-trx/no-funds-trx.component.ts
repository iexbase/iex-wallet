/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { TransferAssetComponent } from "../transfer-asset/transfer-asset.component";

@Component({
    selector: 'no-funds-trx',
    templateUrl: './no-funds-trx.component.html',
    styleUrls: ['./no-funds-trx.component.scss'],
})
export class NoFundsTrxComponent
{

    /**
     * Object creation NoFundsTrxComponent
     *
     * @param {MatDialogRef} dialogRef - Stream that emits when a dialog has been opened.
     */
    constructor(
        public dialogRef: MatDialogRef<TransferAssetComponent>,
    ) {
        //
    }

    /**
     * Close modal and open Receive
     *
     * @return void
     */
    goToReceive(): void {
       this.dialogRef.close();
    }
}
