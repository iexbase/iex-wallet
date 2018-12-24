var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { MatFormFieldModule, MatSelectModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
// Modules shared
import { SharedModule } from "@shared/shared.module";
// Router
import { LoginRoutingModule } from "@modules/login/login-routing.module";
import { LoginPage } from "@modules/login/pages/login/login.page";
// Components
import { CreateAccountComponent } from "@modules/login/components/create-account/create-account.component";
import { LoginAccountComponent } from "@modules/login/components/login-account/login-account.component";
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                MatFormFieldModule,
                MatSelectModule,
                LoginRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule
            ],
            declarations: [
                LoginPage,
                CreateAccountComponent,
                LoginAccountComponent
            ]
        })
    ], LoginModule);
    return LoginModule;
}());
export { LoginModule };
//# sourceMappingURL=login.module.js.map