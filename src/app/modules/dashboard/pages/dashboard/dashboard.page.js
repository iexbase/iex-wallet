var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from "@angular/core";
import { Chart } from "angular-highcharts";
import { HttpClient } from "@angular/common/http";
import env from "../../../../../environments";
var DashboardPage = /** @class */ (function () {
    /**
     * Create a new DashboardPage object
     *
     * @param httpClient: HttpClient
     */
    function DashboardPage(httpClient) {
        this.httpClient = httpClient;
        /**
         * We collect basic data
         *
         * @var any
         */
        this.tronData = {
            rank: 0,
            price: 0,
            volume_24h: 0,
            market_cap: 0,
            circulating_supply: 0
        };
        /**
         * Data to filters
         *
         * @var any[]
         */
        this.filterTimes = [
            { 'name': '1H', 'link': env.ratesAPI.data + "/histominute?fsym=TRX&tsym=USD&limit=59" },
            { 'name': '1D', 'link': env.ratesAPI.data + "/histohour?fsym=TRX&tsym=USD&limit=23" },
            { 'name': '1W', 'link': env.ratesAPI.data + "/histoday?fsym=TRX&tsym=USD&limit=6" },
            { 'name': '1M', 'link': env.ratesAPI.data + "/histoday?fsym=TRX&tsym=USD" },
            { 'name': '2M', 'link': env.ratesAPI.data + "/histoday?fsym=TRX&tsym=USD&limit=60" },
            { 'name': '4M', 'link': env.ratesAPI.data + "/histoday?fsym=TRX&tsym=USD&limit=120" },
            { 'name': '1Y', 'link': env.ratesAPI.data + "/histoday?fsym=TRX&tsym=USD&limit=364" },
            { 'name': 'All', 'link': env.ratesAPI.data + "/histoday?fsym=TRX&tsym=USD&allData=true" }
        ];
        /**
         * Select the default filter
         *
         * @var string
         */
        this.filterValue = '1Y';
    }
    /**
     * We start object life cycle
     *
     * @return void
     */
    DashboardPage.prototype.ngOnInit = function () {
        this.loading().then(function () { });
    };
    /**
     * Loading Data
     *
     * @return Promise
     */
    DashboardPage.prototype.loading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingTRXInfo()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._loadGraphData(this.filterValue)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get detailed information from CoinMarketCap
     *
     * @return Promise
     */
    DashboardPage.prototype.loadingTRXInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.httpClient.get('https://api.coinmarketcap.com/v2/ticker/1958/').subscribe(function (tron) {
                    _this.tronData = {
                        'rank': tron['data']['rank'],
                        'price': tron['data']['quotes']['USD']['price'],
                        'volume_24h': tron['data']['quotes']['USD']['volume_24h'],
                        'market_cap': tron['data']['quotes']['USD']['market_cap'],
                        'circulating_supply': tron['data']['circulating_supply'],
                    };
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * We build graphics due to the prices received
     *
     * @param type - Filter type
     * @return void
     */
    DashboardPage.prototype._loadGraphData = function (type) {
        var _this = this;
        var url = this.filterTimes.find(function (filter) { return filter.name == type; });
        this.httpClient.get(url['link'])
            .subscribe(function (result) {
            _this.loadCharts((result['Data'])
                .map(function (data) {
                return [data.time * 1000, data.close];
            }));
            _this.chart_trx = new Chart(_this.highChartsOptions);
        });
    };
    /**
     * Schedule update as time changes
     *
     * @var void
     */
    DashboardPage.prototype.setOptionSelected = function (type) {
        if (type)
            this.filterValue = type;
        this._loadGraphData(!type ? this.filterValue : type);
    };
    /**
     * Graphics configuration highcharts
     *
     * @var void
     */
    DashboardPage.prototype.loadCharts = function (data) {
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
                    style: {
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
                    enabled: false
                },
                title: {
                    text: null
                },
                gridLineColor: 'rgba(255,255,255,0)'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
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
        };
    };
    DashboardPage = __decorate([
        Component({
            selector: 'dashboard-page',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.page.js.map