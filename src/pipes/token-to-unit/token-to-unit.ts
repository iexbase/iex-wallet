/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pipe, PipeTransform } from '@angular/core';
import {Base64} from "js-base64";

export enum ContractType {
    ACCOUNTCREATECONTRACT = 0,
    TRANSFERCONTRACT = 1,
    TRANSFERASSETCONTRACT = 2,
    VOTEASSETCONTRACT = 3,
    VOTEWITNESSCONTRACT = 4,
    WITNESSCREATECONTRACT = 5,
    ASSETISSUECONTRACT = 6,
    DEPLOYCONTRACT = 7,
    WITNESSUPDATECONTRACT = 8,
    PARTICIPATEASSETISSUECONTRACT = 9,
    ACCOUNTUPDATECONTRACT = 10,
    FREEZEBALANCECONTRACT = 11,
    UNFREEZEBALANCECONTRACT = 12,
    WITHDRAWBALANCECONTRACT = 13,
    UNFREEZEASSETCONTRACT = 14,
    UPDATEASSETCONTRACT = 15,
    CUSTOMCONTRACT = 20
}


@Pipe({
    name: 'tokenToUnit',
    pure: false
})
export class TokenToUnitPipe implements PipeTransform
{
    private item:any;

    constructor() {}
    transform(item: any)
    {
        this.item = item;

        switch (item['contractType'])
        {
            case ContractType.TRANSFERCONTRACT:
                return (item['contractData']['amount'] / 1e6) ;
            case ContractType.TRANSFERASSETCONTRACT:
                return (item['contractData']['amount']);
            case ContractType.UNFREEZEBALANCECONTRACT:
                return '';
            case ContractType.FREEZEBALANCECONTRACT:
                return item['contractData']['frozen_balance'] / 1e6;
        }

    }

    getAssetName() {
        return Base64.decode(this.item['contractData']['asset_name']);
    }
}
