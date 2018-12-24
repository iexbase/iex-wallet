var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
var DomProvider = /** @class */ (function () {
    function DomProvider(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
    }
    DomProvider.prototype.appendComponentToBody = function (component) {
        var componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        var domElem = componentRef.hostView
            .rootNodes[0];
        this.appendToDom(domElem);
        return componentRef;
    };
    DomProvider.prototype.appendToDom = function (domElem) {
        document.getElementsByTagName('app-root')[0].appendChild(domElem);
    };
    DomProvider.prototype.removeComponent = function (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    };
    DomProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ComponentFactoryResolver,
            Injector,
            ApplicationRef])
    ], DomProvider);
    return DomProvider;
}());
export { DomProvider };
//# sourceMappingURL=dom.js.map