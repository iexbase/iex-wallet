/**
 * Copyright (c) iEXBase. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector
} from '@angular/core';


@Injectable()
export class DomProvider {
    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected injector: Injector,
        protected appRef: ApplicationRef
    ) {}

    public appendComponentToBody<T>(component: new (...args) => T): ComponentRef<T> {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory<T>(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<T>)
            .rootNodes[0] as HTMLElement;
        this.appendToDom(domElem);
        return componentRef;
    }

    protected appendToDom(domElem: HTMLElement) {
        document.getElementsByTagName('app-root')[0].appendChild(domElem);
    }

    public removeComponent<T>(componentRef: ComponentRef<T>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
