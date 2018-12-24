var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MasterpageComponent } from "@shared/masterpage/masterpage.component";
import { AuthGuardService } from "./auth-guard.service";
var routes = [{
        path: 'login', loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: '',
        component: MasterpageComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
            { path: 'wallet', loadChildren: './modules/wallet/wallet.module#WalletModule' },
            { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
            // Fallback when no prior route is matched
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, {
                    useHash: true,
                    initialNavigation: 'enabled'
                })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map