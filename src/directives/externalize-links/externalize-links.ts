import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';

// Providers
import { ExternalLinkProvider } from "@providers/external-link/external-link";


@Directive({
    selector: '[externalize-links]'
})
export class ExternalizeLinks implements AfterViewInit, OnDestroy
{
    /**
     * Create a new ExternalizeLinks object
     *
     * @param {ElementRef} element - A wrapper around a native element inside of a View.
     * @param {ExternalLinkProvider} externalLinkProvider - External link provider
     */
    constructor(
        private element: ElementRef,
        private externalLinkProvider: ExternalLinkProvider
    ) {
        //
    }

    async ngAfterViewInit() {
        await timer(500).toPromise();
        this.getAllLinks().forEach(aTag =>
            aTag.addEventListener('click', this.handleClick.bind(this))
        );
    }

    ngOnDestroy() {
        this.getAllLinks().forEach(aTag => {
            aTag.removeEventListener('click', this.handleClick.bind(this));
        });
    }

    /**
     * Getting all links
     *
     * @return any
     */
    private getAllLinks(): any[] {
        return this.element.nativeElement.querySelectorAll('a');
    }

    /**
     * handleClick
     *
     * @param {any} event
     * @return any
     */
    private handleClick(event): any {
        event.preventDefault();
        this.openExternalLink(event.srcElement.href);
    }

    /**
     * Open link in browser
     *
     * @param {string} url - url
     */
    private openExternalLink(url: string): void {
        this.externalLinkProvider.open(url);
    }
}
