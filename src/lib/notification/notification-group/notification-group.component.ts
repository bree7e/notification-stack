import {
  animate,
  group,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { INotifyBanner, INotifyEvent } from '../notification.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngispui-notification-group',
  templateUrl: './notification-group.component.html',
  styleUrls: ['./scss/notification-group/_ngispui-notification-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0,
          height: 0,
          margin: 0,
          padding: 0
        }),
        group([
          animate(
            '250ms ease-out',
            style({
              height: '*',
              margin: '*',
              padding: '*'
            })
          ),
          animate(
            '500ms cubic-bezier(.8,-0.6,0.2,1.5)', // отскок
            style({ transform: 'translateX(0)', opacity: 1 })
          )
        ])
      ]),
      transition(':leave', [
        animate(
          '250ms ease-out',
          style({
            transform: 'translateX(100%)',
            opacity: 0
          })
        ),
        animate(
          '250ms ease-out',
          style({
            height: 0,
            margin: 0,
            padding: 0
          })
        )
      ])
    ])
  ]
})
export class NgISPUINotificationGroupComponent implements OnInit {
  /** время жизни нотификации */
  public hideTimeout = 10000;
  /** список нотификаций */
  public notificationList: INotifyBanner[] = [];
  /** буфер для пушей, до инициализации компонента */
  private _notificationListBuffer: INotifyBanner[] = [];
  /** сабжект событий нотификации */
  private _eventEmitter = new Subject<INotifyEvent>();
  /** флаг инициализации компонента */
  private initComponent = false;
  /** максимальное количество отображаемых баннеров */
  readonly MAX_NOTIFY_SHOW_COUNT = 5;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.initComponent = true;
    this._checkBuffer();
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Ф-ция получения идентификатора элемента в массиве для ngFor
   * @param index - индекс элемента в массиве
   * @param notify - объект нотификации
   */
  trackByFn(index: number, notify: INotifyBanner) {
    return notify.id;
  }

  /**
   * Обработчик события клика по баннеру
   * @param id - id нотификации
   */
  onClickHandler(id: number): void {
    this._eventEmitter.next({ type: 'click', id });
  }

  /**
   * Обработчик события клика по ссылке
   * @param id - id нотификации
   */
  onLinkClickHandler(id: number): void {
    this._eventEmitter.next({ type: 'link-click', id });
  }

  /**
   * Обработчик события клика по кресту
   * @param id - id нотификации
   */
  onCloseHandler(id: number): void {
    this._removeBanner(id);
    this._eventEmitter.next({ type: 'close', id });
  }

  /**
   * Добавить баннер нотификации
   * @param banner - объект баннера
   */
  push(banner: INotifyBanner): Observable<INotifyEvent> {
    if (
      this.initComponent &&
      this.notificationList.length < this.MAX_NOTIFY_SHOW_COUNT
    ) {
      this._addBanner(banner);
    } else {
      this._notificationListBuffer.push(banner);
    }
    // @TODO подумать об этом
    return this._eventEmitter
      .asObservable()
      .pipe(filter(d => d.id === banner.id));
  }

  /**
   * Проверить буфер нотификаций и добавить нотификации в шаблон
   */
  _checkBuffer(): void {
    if (this._notificationListBuffer.length) {
      this._notificationListBuffer.forEach(this._moveBannerToList);
    }
  }

  /**
   * Добавить нотификации в шаблон
   * @param b - нотификация
   * @param index - номер
   */
  private _moveBannerToList(b: INotifyBanner, index: number): void {
    if (this.notificationList.length < this.MAX_NOTIFY_SHOW_COUNT) {
      this._addBanner(b);
      this._notificationListBuffer.splice(index, 1);
    }
  }

  /**
   * Удалить баннер
   * @param id - id баннера
   */
  private _removeBanner(id: number): boolean {
    const index = this.notificationList.findIndex(p => p.id === id);
    if (this.notificationList[index]) {
      this.notificationList.splice(index, 1);
    }
    this._changeDetectorRef.markForCheck();
    this._checkBuffer();
    return index !== -1;
  }

  /**
   * Скрыть баннер по таймауту
   * @param id - id баннера
   */
  private _hideBanner(id: number) {
    if (this._removeBanner(id)) {
      this._eventEmitter.next({ type: 'hide', id });
    }
  }

  /**
   * Отобразить баннер в шаблоне
   * @param banner - объект баннера
   */
  private _addBanner(banner: INotifyBanner) {
    this.notificationList.unshift(banner);
    this.setBannerTimer(banner);
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Установить таймаут закрытия уведомления
   * @param banner - объект баннера
   */
  public setBannerTimer(banner: INotifyBanner): void {
    if (banner.type === 'normal-fast' || banner.type === 'rest-fast') {
      banner.timer = setTimeout(() => {
        this._hideBanner(banner.id);
      }, this.hideTimeout);
    }
  }

  /**
   * Убрать таймер с уведомления
   * @param banner - объект баннера
   */
  public clearBannerTimer(banner: INotifyBanner): void {
    clearTimeout(banner.timer);
  }


  animationDone(event) {
    console.log('End', event);
  }
}
