import { Injectable } from '@angular/core';

// Providers
import { ElectronProvider } from '@providers/electron/electron';
import { Logger } from '@providers/logger/logger';

@Injectable()
export class ExternalLinkProvider {
    /**
     * Object creation ExternalLinkProvider
     *
     * @param {Logger} logger - Log provider
     * @param {ElectronProvider} electronProvider - Electron provider
     */
    constructor(
        private logger: Logger,
        private electronProvider: ElectronProvider
    ) {
        this.logger.debug('ExternalLinkProvider initialized');
    }

    /**
     * Open link
     *
     * @param {string} url - link
     * @return void
     */
    public open(url: string): void {
        const old = (window as any).handleOpenURL;

        (window as any).handleOpenURL = (u: any) => {
            // Ignore external URLs
            this.logger.debug('Skip: ' + u);
        };

        this.electronProvider.openExternalLink(url);
        this.restoreHandleOpenURL(old);
    }

    private restoreHandleOpenURL(old: string): void {
        setTimeout(() => {
            (window as any).handleOpenURL = old;
        }, 500);
    }
}
