var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "@shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxWebstorageModule } from "ngx-webstorage";
import { MissingTranslationHandler, TranslateDefaultParser, TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AuthGuardService } from "./auth-guard.service";
import { appReducer, metaReducers } from "@redux/index";
import { StoreModule } from "@ngrx/store";
import { ProvidersModule } from "@providers/providers.module";
import { MatIconRegistry } from "@angular/material";
export function translateLoaderFactory(http) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export function translateParserFactory() {
    return new InterpolatedTranslateParser();
}
var InterpolatedTranslateParser = /** @class */ (function (_super) {
    __extends(InterpolatedTranslateParser, _super);
    function InterpolatedTranslateParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateMatcher = /{\s?([^{}\s]*)\s?}/g;
        return _this;
    }
    return InterpolatedTranslateParser;
}(TranslateDefaultParser));
export { InterpolatedTranslateParser };
var MyMissingTranslationHandler = /** @class */ (function () {
    function MyMissingTranslationHandler() {
        this.parser = translateParserFactory();
    }
    MyMissingTranslationHandler.prototype.handle = function (params) {
        return this.parser.interpolate(params.key, params.interpolateParams);
    };
    return MyMissingTranslationHandler;
}());
export { MyMissingTranslationHandler };
var AppModule = /** @class */ (function () {
    function AppModule(matIconRegistry, domSanitizer) {
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.matIconRegistry.addSvgIcon("c-refresh", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/refresh.svg"));
        this.matIconRegistry.addSvgIcon("trx-send", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/send.svg"));
        this.matIconRegistry.addSvgIcon("trx-receive", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/receive.svg"));
        this.matIconRegistry.addSvgIcon("trx-freeze", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/freeze.svg"));
        this.matIconRegistry.addSvgIcon("trx-unfreeze", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/unfreeze.svg"));
        this.matIconRegistry.addSvgIcon("trx-contract", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/contract.svg"));
        this.matIconRegistry.addSvgIcon("trx-copy", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/mat-icon/copy.svg"));
        this.matIconRegistry.addSvgIcon('trx-link', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/broken-link.svg'));
        this.matIconRegistry.addSvgIcon('preferences', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/preferences.svg'));
        this.matIconRegistry.addSvgIcon('ghost-straight', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/ghost.svg'));
        this.matIconRegistry.addSvgIcon('round-delete', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-icon/round-delete-button.svg'));
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserAnimationsModule,
                BrowserModule,
                HttpClientModule,
                StoreModule.forRoot(appReducer, { metaReducers: metaReducers }),
                ProvidersModule,
                NgxWebstorageModule.forRoot({
                    prefix: 'tron-wallet',
                    separator: '.',
                    caseSensitive: true
                }),
                TranslateModule.forRoot({
                    parser: { provide: TranslateParser, useFactory: translateParserFactory },
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
                AppRoutingModule,
            ],
            providers: [
                AuthGuardService
            ],
            bootstrap: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        }),
        __metadata("design:paramtypes", [MatIconRegistry,
            DomSanitizer])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map