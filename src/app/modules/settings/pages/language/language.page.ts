/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Component, OnInit} from "@angular/core";

import {LanguageProvider} from "@providers/language/language";

@Component({
    selector: 'language',
    templateUrl: './language.page.html',
    styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit
{
    /**
     * Selected language
     *
     * @var string
     */
    public currentLanguage: string;

    /**
     * List of available languages
     *
     * @var any[]
     */
    public languages: any[];

    /**
     * Object creation LanguagePage
     *
     * @param {LanguageProvider} languageProvider - Language provider
     */
    constructor(
        private languageProvider: LanguageProvider,
    ) {
        //
    }

    /**
     * We start object life cycle
     *
     * @return void
     */
    ngOnInit() {
        this.currentLanguage = this.languageProvider.getCurrent();
        this.languages = this.languageProvider.getAvailables();
    }

    /**
     * Change language
     *
     * @param {string} newLang - New language
     * @return void
     */
    public save(newLang: string): void {
        this.languageProvider.set(newLang);
    }
}
