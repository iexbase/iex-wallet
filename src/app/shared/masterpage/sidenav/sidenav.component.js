var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent(media) {
        var _this = this;
        this.onMenuToggle = new EventEmitter();
        this.watcher = media.subscribe(function (change) {
            if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
                _this.activeMediaQuery = true;
            }
            else {
                _this.activeMediaQuery = false;
            }
        });
    }
    SidenavComponent.prototype.ngOnInit = function () {
        this.navs = [{
                icon: 'home',
                link: '/dashboard',
                name: 'Shared.Navigation.Dashboard',
                divider: false,
                sub_header: null,
                wallets: false
            },
            {
                icon: 'account_balance_wallet',
                link: '/wallet',
                name: 'Shared.Navigation.Wallet',
                divider: false,
                sub_header: null,
                wallets: true
            }, {
                icon: 'settings',
                link: '/settings',
                name: 'Shared.Navigation.Settings',
                divider: false,
                sub_header: null,
                wallets: false
            }
        ];
    };
    SidenavComponent.prototype.ngOnDestroy = function () {
        this.watcher.unsubscribe();
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SidenavComponent.prototype, "onMenuToggle", void 0);
    SidenavComponent = __decorate([
        Component({
            selector: 'app-sidenav',
            templateUrl: './sidenav.component.html',
            styleUrls: ['./sidenav.component.scss']
        }),
        __metadata("design:paramtypes", [ObservableMedia])
    ], SidenavComponent);
    return SidenavComponent;
}());
export { SidenavComponent };
//# sourceMappingURL=sidenav.component.js.map