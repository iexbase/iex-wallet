import {Injectable} from '@angular/core';
import {ElectronProvider} from '@providers/electron/electron';
import {Logger} from '@providers/logger/logger';

@Injectable()
export class ClipboardProvider {
    /**
     * Check that the action is made from the platform "Electron"
     *
     * @var boolean
     */
    private isElectron: boolean;

    /**
     * Create a new ClipboardProvider object
     *
     * @param {Logger} logger - Log provider
     * @param {ElectronProvider} electronProvider - Electron provider
     */
    constructor(
        public logger: Logger,
        private electronProvider: ElectronProvider
    ) {
        this.logger.debug('ClipboardProvider initialized');
        this.isElectron = this.electronProvider.isElectronApp;
    }

    /**
     * getData
     *
     * @returns {Promise}
     */
    public async getData(): Promise<any> {
        return this.paste();
    }

    /**
     * copy
     *
     * Copy text to clipboard (Electron)
     *
     * @return void
     */
    public copy(value: string): void {
        if (this.isElectron) {
            this.electronProvider.writeToClipboard(value);
        } else {
            throw new Error('Copied to Clipboard using a Web Browser.');
        }
    }

    /**
     * paste
     *
     * Paste copied text (Electron)
     *
     * @returns {Promise}
     */
    private async paste(): Promise<any> {
        if (this.isElectron) {
            return this.electronProvider.readFromClipboard();
        } else {
            this.logger.warn('Paste from clipboard not supported');
            return;
        }
    }

    /**
     * clear
     *
     * Clear Clipboard Data
     *
     * @return void
     */
    public clear(): void {
        if (this.isElectron) {
            this.electronProvider.clearClipboard();
        }
    }
}
