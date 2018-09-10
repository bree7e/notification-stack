import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injector } from '@angular/core';

/**
 * Класс для вставки компонента в DOM и связка его с ангуляром
 */
export class DOMOutlet {
  /** ф-ция коллбэка при очистке компонента */
  private _disposeFn: (() => void) | null;
  /** флаг уничтожения компонента */
  private _disposed = false;

  constructor(
      public outletElement: Element,
      private _componentResolver: ComponentFactoryResolver,
      private _appRef: ApplicationRef,
      private _defaultInjector: Injector,
    ) {
  }


  /**
   * Добавить компонент в DOM
   * @param component - компонент который вставляем в DOM
   * @param injector - инжектор для создания компонента
   * @param componentResolver - резолер для создания компонента
   */
  attachComponent(component: any, injector?: Injector, componentResolver?: ComponentFactoryResolver): ComponentRef<any> {
    let componentRef;
    if (componentResolver) {
       componentRef = componentResolver.resolveComponentFactory(component).create(injector);
    } else {
      componentRef = this._componentResolver.resolveComponentFactory(component).create(this._defaultInjector);
    }

    this._appRef.attachView(componentRef.hostView);

    this.setDisposeFn(() => {
      this._appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    this.outletElement.appendChild(this._getComponentRootNode(componentRef));

    return componentRef;
  }


  /**
   * Задать ф-цию вызываемую при отчистке DOM от компонента
   * @param fn - ф-ция
   */
  setDisposeFn(fn: () => void) {
    this._disposeFn = fn;
  }


  /**
   * Очистить DOM от компонента
   */
  dispose(): void {
    if (!this._disposed) {
      this._disposed = true;
      this._invokeDisposeFn();
      if (this.outletElement.parentNode != null) {
        this.outletElement.parentNode.removeChild(this.outletElement);
      }
    }
  }


  /**
   *  Вызов ф-ции коллбэка при отчистке DOM от компонента
   */
  private _invokeDisposeFn() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }


  /**
   * Получить html компонента
   * @param componentRef - ссылка на компонент
   */
  private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}
