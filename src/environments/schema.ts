/**
 * TronWallet does not yet build with Angular CLI, but our environment system works
 * the same way.
 */
export interface EnvironmentSchema {
    name: 'production' | 'development';
    ratesAPI: {
        trx: string;
        data: string
    },

    explorer: {
        url: string;
        api: string;
    },

    login: {
        lockedMinutes: number,
        failedLogin: number
    }
}
