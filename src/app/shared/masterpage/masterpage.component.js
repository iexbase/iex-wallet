var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { of } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import * as fromSkin from "@redux/skins/skins.reducer";
var MasterpageComponent = /** @class */ (function () {
    function MasterpageComponent(store, breakpointObserver) {
        this.store = store;
        this.breakpointObserver = breakpointObserver;
        this.sidenavMode$ = of('over');
        this.sidenavOpen$ = of(false);
        this.activeAkin = {};
    }
    MasterpageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.pipe(select(fromSkin.findSkinById(1))).subscribe(function (result) {
            _this.activeAkin = result;
        });
        this.sidenavMode$ = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small
        ]).pipe(map(function (result) { return result.matches ? 'over' : 'side'; }));
        this.sidenavOpen$ = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small
        ]).pipe(map(function (result) { return !result.matches; }));
    };
    MasterpageComponent = __decorate([
        Component({
            selector: 'app-masterpage',
            templateUrl: './masterpage.component.html',
            styleUrls: ['./masterpage.component.scss']
        }),
        __metadata("design:paramtypes", [Store,
            BreakpointObserver])
    ], MasterpageComponent);
    return MasterpageComponent;
}());
export { MasterpageComponent };
//# sourceMappingURL=masterpage.component.js.map