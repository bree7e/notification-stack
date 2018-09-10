import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injector, OnDestroy, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { NgISPUINotificationGroupComponent } from './notification-group/notification-group.component';
import { INotifyBanner, INotifyEvent } from './notification.interface';
import { DOMOutletContainer, DOMOutlet } from 'src/lib/dom-outlet';

@Injectable({
    providedIn: 'root'
})
export class NgISPUINotificationService implements OnDestroy {
  /** таймаут скрытия нотификации */
  private _hideTimeout = 5000;

  set hideTimeout(value: number) {
    this._hideTimeout = value;
  }

  get hideTimeout() {
    return this._hideTimeout;
  }

  /** ссылка на компонент списка нотификаций */
  private _notifyListCompRef: ComponentRef<NgISPUINotificationGroupComponent>;
  /** объект добавления компонента в DOM */
  private _domOutlet: DOMOutlet;


  constructor(
    private _domContainer: DOMOutletContainer,
    private _appRef: ApplicationRef,
    private _componentResolver: ComponentFactoryResolver,
    private _injector: Injector,
    @Inject(DOCUMENT) protected _document: any,
  ) {
    this._createNotifyListComp();
  }


  /**
   * Добавить нотификацию в очередь
   * @param banner - объект нотификации
   */
  push(banner: INotifyBanner): Observable<INotifyEvent> {
    const id = new Date().getTime();
    const notifyListComp = this._getNotifyListCompRef().instance;
    banner.id = id;
    return notifyListComp.push(banner);
  }


  /**
   * Получить ссылку на компонент списка нотификаций
   */
  private _getNotifyListCompRef(): ComponentRef<NgISPUINotificationGroupComponent> {
    if (!this._notifyListCompRef) {
      this._createNotifyListComp();
    }
    return this._notifyListCompRef;
  }


  /**
   * Добавить компонент списка нотификаций в DOM
   */
  private _createNotifyListComp(): void {
    const domOutlet = new DOMOutlet(this._createHostElement(), this._componentResolver, this._appRef, this._injector);
    const compRef = domOutlet.attachComponent(NgISPUINotificationGroupComponent);
    this._notifyListCompRef = compRef;
  }


  /**
   * Создать хост элемент для компонента списка нотификаций
   */
  private _createHostElement(): HTMLElement {
    const host = this._document.createElement('div');
    host.classList.add('ngispui-notification-wrapper');
    this._domContainer.getContainerElement().appendChild(host);
    return host;
  }


  ngOnDestroy() {
    if (this._domOutlet) {
      this._domOutlet.dispose();
    }
  }

}

