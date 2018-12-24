var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MasterpageComponent } from "./masterpage/masterpage.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MomentModule } from "ngx-moment";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from "@angular/material";
import { SidenavComponent } from "./masterpage/sidenav/sidenav.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipesModule } from "@pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { TimeAgoPipe } from "time-ago-pipe";
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var sharedModules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    InfiniteScrollModule,
    MomentModule,
    TranslateModule,
    RouterModule,
    PipesModule
];
var sharedMaterialModules = [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatRippleModule,
    MatSelectModule,
    MatButtonToggleModule
];
var sharedComponents = [
    MasterpageComponent,
    SidenavComponent
];
var sharedPipes = [
    TimeAgoPipe
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: sharedModules.concat(sharedMaterialModules),
            declarations: sharedComponents.concat(sharedPipes),
            exports: sharedModules.concat(sharedMaterialModules, sharedComponents, sharedPipes),
            providers: [
                {
                    provide: PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                }
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map