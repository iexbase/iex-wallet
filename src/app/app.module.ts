/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata';
import 'polyfills';

import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "@shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxWebstorageModule} from "ngx-webstorage";
import {
    MissingTranslationHandler,
    MissingTranslationHandlerParams,
    TranslateDefaultParser,
    TranslateLoader,
    TranslateModule,
    TranslateParser
} from '@ngx-translate/core';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthGuardService} from "./auth-guard.service";
import {appReducer, metaReducers} from "@redux/index";
import {StoreModule} from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {ProvidersModule} from "@providers/providers.module";
import {MatIconRegistry} from "@angular/material";
import env from "../environments";

export function translateLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function translateParserFactory() {
    return new InterpolatedTranslateParser();
}

export class InterpolatedTranslateParser extends TranslateDefaultParser {
    public templateMatcher: RegExp = /{\s?([^{}\s]*)\s?}/g;
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
    public parser: TranslateParser = translateParserFactory();
    public handle(params: MissingTranslationHandlerParams) {
        return this.parser.interpolate(params.key, params.interpolateParams);
    }
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot(appReducer, {metaReducers}),
        // dev enabled
        env.name != 'production' ? StoreDevtoolsModule.instrument({
            maxAge: 25 // Retains last 25 states
        }) : [],
        ProvidersModule,
        NgxWebstorageModule.forRoot({
            prefix: 'tron-wallet',
            separator: '.',
            caseSensitive:true
        }),
        TranslateModule.forRoot({
            parser: {
                provide: TranslateParser,
                useFactory: translateParserFactory
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MyMissingTranslationHandler
            },
            loader: {
                provide: TranslateLoader,
                useFactory: translateLoaderFactory,
                deps: [HttpClient]
            }
        }),
        SharedModule,
        AppRoutingModule
    ],
    providers: [
        AuthGuardService
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AppModule
{
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            "c-refresh",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/refresh.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "trx-send",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/send.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "trx-receive",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/receive.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "trx-freeze",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/freeze.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "trx-unfreeze",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/unfreeze.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "trx-contract",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/contract.svg")
        );

        this.matIconRegistry.addSvgIcon(
            'trx-vote',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/vote.svg')
        );

        this.matIconRegistry.addSvgIcon(
            "trx-copy",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/copy.svg")
        );

        this.matIconRegistry.addSvgIcon(
            'trx-link',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/broken-link.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'preferences',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/preferences.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'trx-menu',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/menu.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'ghost-straight',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/ghost.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'twitter-icon',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/twitter.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'discord-icon',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/discord.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'email-icon',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/email.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'telegram-icon',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/telegram.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'round-delete',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/round-delete-button.svg')
        );
    }
}
