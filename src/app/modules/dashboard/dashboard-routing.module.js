var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardPage } from "./pages/dashboard/dashboard.page";
var dashboardRoutes = [{
        path: '',
        component: DashboardPage
    }];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(dashboardRoutes)],
            exports: [RouterModule]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());
export { DashboardRoutingModule };
//# sourceMappingURL=dashboard-routing.module.js.map