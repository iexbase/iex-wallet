/**
 * Environment: prod
 */
var env = {
    name: 'production',
    ratesAPI: {
        trx: 'https://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD,EUR,RUB,JPY,GBP,AUD,CAD,IDR,INR,KRW,MXN,NZD,PLN,TRY,BTC',
        data: 'https://min-api.cryptocompare.com/data'
    },
    explorer: {
        // url: 'https://explorer.shasta.trongrid.io',
        // api: 'https://explorer.shasta.trongrid.io/api'
        url: 'https://tronscan.org/#',
        api: 'https://wlcyapi.tronscan.org/api'
    },
    login: {
        lockedMinutes: 2,
        failedLogin: 10
    }
};
export default env;
//# sourceMappingURL=prod.js.map