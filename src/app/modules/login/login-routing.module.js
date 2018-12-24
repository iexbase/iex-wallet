var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginPage } from "@modules/login/pages/login/login.page";
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild([
                    {
                        path: '',
                        component: LoginPage
                    }
                ])],
            exports: [RouterModule]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());
export { LoginRoutingModule };
//# sourceMappingURL=login-routing.module.js.map