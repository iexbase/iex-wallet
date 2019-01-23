import {Component, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppState} from "@redux/index";
import * as fromConfig from "@redux/settings/settings.reducer";
import * as fromWallet from "@redux/wallet/wallet.reducer";
import {Observable} from "rxjs";


@Component({
    selector: 'app-overall-balance',
    templateUrl: './overall-balance.component.html',
    styleUrls: ['./overall-balance.component.scss']
})
export class OverallBalanceComponent implements OnInit {

    /**
     * Display total wallet balance
     *
     * @var Observable
     */
    fullBalance: Observable<number>;

    /**
     * Get fiat symbol
     *
     * @var Observable
     */
    alternativeSymbol: Observable<string>;

    /**
     * Get fiat iso code
     *
     * @var Observable
     */
    alternativeIsoCode: Observable<string>;

    /**
     * Create a new OverallBalanceComponent object
     *
     * @param {Store} store - Reactive service
     */

    constructor(
        protected store: Store<AppState>
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.store.pipe(
            select(fromConfig.findConfigById(1))
        ).subscribe(result => {

            this.alternativeSymbol = (result.alternativeIsoCode != 'BTC' ? result.alternativeSymbol: null);
            this.alternativeIsoCode = result.alternativeIsoCode;

            // List all accounts
            this.store.pipe(select(fromWallet.selectAllWallets)).subscribe(account => {
                this.fullBalance = account.reduce((sum, value) => sum + value['balance'], 0);
            });
        });
    }
}
