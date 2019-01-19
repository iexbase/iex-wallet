import { DOCUMENT} from '@angular/common';
import { Directive, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

// Providers
import { ClipboardProvider } from '@providers/clipboard/clipboard';
import { Logger } from '@providers/logger/logger';

@Directive({
    selector: '[copy-to-clipboard]', // Attribute selector
    inputs: ['value: copy-to-clipboard', 'hideToast: hide-toast'],
    host: {
        '(click)': 'copy()'
    }
})
export class CopyToClipboard {
    public value: string;
    public hideToast: boolean;
    private dom: Document;

    /**
     * Create a new AppComponent object
     *
     * @param {Document} dom - DOM APIs
     * @param {Logger} logger - Log provider
     * @param {TranslateService} translate - Translate service
     * @param {ClipboardProvider} clipboardProvider - Clipboard provider
     * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
     */
    constructor(
        @Inject(DOCUMENT) dom: Document,
        public logger: Logger,
        public translate: TranslateService,
        private clipboardProvider: ClipboardProvider,
        private snackBar: MatSnackBar
    ) {
        this.dom = dom;
    }

    /**
     * copyBrowser
     *
     * Copied to clipboard in browser
     *
     * @return void
     */
    private copyBrowser(): void {
        const textarea: any = this.dom.createElement('textarea');
        this.dom.body.appendChild(textarea);
        textarea.value = this.value;
        textarea.select();
        this.dom.execCommand('copy');
        this.dom.body.removeChild(textarea);
    }

    /**
     * copy
     *
     * Copied to clipboard
     */
    public copy(): void {
        if (!this.value) { return; }
        try {
            this.clipboardProvider.copy(this.value);
        } catch (e) {
            if (e) { this.logger.warn(e.message); }
            this.copyBrowser();
        }
        if (this.hideToast) { return; }

        // notification
        this.snackBar.open(
            this.translate.instant('copyToClipboard'), null, {
            duration: 2000,
            panelClass: ['snackbar-theme-dialog']
        });
    }
}
