/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, OnInit} from "@angular/core";
import { Chart } from "angular-highcharts";
import { HttpClient } from "@angular/common/http";
import env from "../../../../../environments";

@Component({
    selector: 'dashboard-page',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit
{
    /**
     * Ad graphics for TRON
     *
     * @var Chart
     */
    chart_trx:Chart;

    /**
     * Options charts
     *
     * @var any
     */
    private highChartsOptions;

    /**
     * We collect basic data
     *
     * @var any
     */
    public tronData: any = {
        rank: <number> 0,
        price:<number> 0,
        volume_24h: <number> 0,
        market_cap: <number> 0,
        circulating_supply: <number> 0
    };

    /**
     * Data to filters
     *
     * @var any[]
     */
    filterTimes: any[] = [
        {'name': '1H', 'link': `${env.ratesAPI.data}/histominute?fsym=TRX&tsym=USD&limit=59`},
        {'name': '1D', 'link': `${env.ratesAPI.data}/histohour?fsym=TRX&tsym=USD&limit=23`},
        {'name': '1W', 'link': `${env.ratesAPI.data}/histoday?fsym=TRX&tsym=USD&limit=6`},
        {'name': '1M', 'link': `${env.ratesAPI.data}/histoday?fsym=TRX&tsym=USD`},
        {'name': '2M', 'link': `${env.ratesAPI.data}/histoday?fsym=TRX&tsym=USD&limit=60`},
        {'name': '4M', 'link': `${env.ratesAPI.data}/histoday?fsym=TRX&tsym=USD&limit=120`},
        {'name': '1Y', 'link': `${env.ratesAPI.data}/histoday?fsym=TRX&tsym=USD&limit=364`},
        {'name': 'All', 'link': `${env.ratesAPI.data}/histoday?fsym=TRX&tsym=USD&allData=true`}
    ];

    /**
     * Select the default filter
     *
     * @var string
     */
    filterValue: string = '1Y';

    /**
     * Create a new DashboardPage object
     *
     * @param httpClient: HttpClient
     */
    constructor(
        private httpClient: HttpClient
    ) {}

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.loading().then(() => {})
    }

    /**
     * Loading Data
     *
     * @return Promise
     */
    async loading(): Promise<any> {
        await this.loadingTRXInfo();
        await this._loadGraphData(this.filterValue);
    }

    /**
     * Get detailed information from CoinMarketCap
     *
     * @return Promise
     */
    private async loadingTRXInfo(): Promise<any>
    {
        this.httpClient.get('https://api.coinmarketcap.com/v2/ticker/1958/').subscribe(tron => {
            this.tronData = {
                'rank': tron['data']['rank'],
                'price': tron['data']['quotes']['USD']['price'],
                'volume_24h': tron['data']['quotes']['USD']['volume_24h'],
                'market_cap': tron['data']['quotes']['USD']['market_cap'],
                'circulating_supply': tron['data']['circulating_supply'],
            }
        });
    }

    /**
     * We build graphics due to the prices received
     *
     * @param type - Filter type
     * @return void
     */
    private _loadGraphData(type:string): void
    {
        let url = this.filterTimes.find(
            filter => filter.name == type
        );

        this.httpClient.get(url['link'])
            .subscribe(result =>
            {
                this.loadCharts((result['Data'])
                    .map(data => {
                        return [data.time * 1000, data.close]
                    }));
                this.chart_trx = new Chart(this.highChartsOptions);
            });
    }

    /**
     * Schedule update as time changes
     *
     * @var void
     */
    setOptionSelected(type: string): void {
        if(type) this.filterValue = type;
        this._loadGraphData(!type ? this.filterValue : type);
    }

    /**
     * Graphics configuration highcharts
     *
     * @var void
     */
    private loadCharts(data: any): void
    {
        this.highChartsOptions = {
            chart: {
                height: 300,
                type: 'area',
                backgroundColor: 'rgba(255,255,255,0)',
                style: {
                    fontFamily: 'Roboto, self'
                }
            },
            series: [{ data: data }],
            colors: ['#1e88e5'],
            legend: {
                enabled: false
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    style : {
                        color: '#afafaf',
                        fontWeight: '500'
                    }
                },
                dateTimeLabelFormats: {
                    day: '%d.%m.%Y'
                },
                title: {
                    text: null
                }
            },
            yAxis: {
                labels: {
                    enabled:false
                },
                title: {
                    text: null
                },

                gridLineColor: 'rgba(255,255,255,0)'
            },
            credits: {
                enabled: false
            },
            plotOptions:<any> {
                series: {
                    fillColor: 'rgba(0, 0, 0, 0.35)'
                },
                area: {
                    marker: {
                        enabled: false
                    },
                    enableMouseTracking: false
                }
            },
        }
    }
}
