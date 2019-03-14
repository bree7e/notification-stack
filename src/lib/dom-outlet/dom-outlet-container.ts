import { DOCUMENT } from '@angular/common';
import { Inject, InjectionToken, OnDestroy, Optional, SkipSelf } from '@angular/core';

export class DOMOutletContainer implements OnDestroy {
  private _containerElement: HTMLElement;

  constructor(@Inject(DOCUMENT) protected _document: any) {}

  ngOnDestroy() {
    if (this._containerElement && this._containerElement.parentNode) {
      this._containerElement.parentNode.removeChild(this._containerElement);
    }
  }

  /**
   * Получить html элемент контейнера
   */
  getContainerElement(): HTMLElement {
    if (!this._containerElement) {
      this._createContainer();
    }
    return this._containerElement;
  }

  /**
   * Создать контейнер для для вствки компонентов
   */
  private _createContainer(): void {
    const container = this._document.createElement('div');

    container.classList.add('ngispui-domoutlet-container');
    this._document.body.appendChild(container);
    this._containerElement = container;
  }
}

/** @docs-private @deprecated @deletion-target 7.0.0 */
export function DOMOUTLETCONTAINER_PROVIDER_FACTORY(
  parentContainer: DOMOutletContainer,
  _document: any
) {
  return parentContainer || new DOMOutletContainer(_document);
}

/** @docs-private @deprecated @deletion-target 7.0.0 */
export const DOMOUTLETCONTAINER_PROVIDER = {
  // Если DOMOutletContainer уже существует, то используем его, иначе создаем новый
  provide: DOMOutletContainer,
  deps: [[new Optional(), new SkipSelf(), DOMOutletContainer], DOCUMENT as InjectionToken<any>],
  useFactory: DOMOUTLETCONTAINER_PROVIDER_FACTORY,
};
