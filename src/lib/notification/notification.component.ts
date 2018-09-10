import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LinkType, TNotify, TNotifyBanner } from './notification.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngispui-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./scss/notification/_ngispui-notification.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgISPUINotificationComponent {
  /** заголовок уведомления */
  @Input() title: string;
  /** время уведомления */
  @Input() time: string;
  /** контент уведомления */
  @Input() content: string;
  /** id уведомления */
  @Input() id: number;

  private _linkType: LinkType = LinkType.default;
  /** тип ссылки */
  @Input() set linkType(value: LinkType) {
    if (value in LinkType) {
      this._linkType = value;
    }
  }

  /** тип уведомлений которое получается преобразованием строки приходящей в type, имеет значения:
   * - 'error',
   * - 'normal',
   * - 'rest'
   */
  private _typeNotification: TNotify;
  /** является ли ссылкой? */
  public isList: boolean;
  /** тип уведомления имеющий значения:
   * - 'error-fast',
   * - 'normal-fast',
   * - 'rest-fast',
   * - 'error-list',
   * - 'normal-list',
   * - 'rest-list'.
   */
  @Input()
  set type(value: TNotifyBanner) {
    const types: any = value.split('-');
    this._typeNotification = types[0];
    this.isList = types[1] === 'list';
  }

  /** является ли ссылкой */
  public isLink: boolean;
  /** приватное поле содержащее значение ссылка */
  private _link: string;
  /** ссылка */
  @Input()
  set link(value: string) {
    this.isLink = false;
    if (value) {
      this.isLink = value.length !== 0;
    }
    this._link = value;
  }
  get link(): string | undefined {
    return this._link;
  }

  /** событие срабатывающее при нажатии на кнопку закрытия уведомления */
  @Output() onClose = new EventEmitter<number>();
  /** событие срабатывающее при нажатии на уведомление */
  @Output() onClick = new EventEmitter<number>();
  /** событие срабатывающее при нажатии на ссылку */
  @Output() linkClick = new EventEmitter<number>();

  /** класс навешиваемый на контейнер */
  @HostBinding('class.ngispui-notification')
  get notificationClass(): boolean {
    return true;
  }

  /** класс навешиваемый на контейнер если он содержит ссылку */
  @HostBinding('class.ngispui-notification_wrap-link')
  get notificationLinkClass(): boolean {
    return this.isLink;
  }

  /** класс навешиваемый на контейнер если он имеет тип ...-list */
  @HostBinding('class.ngispui-notification_is-list')
  get notificationListClass(): boolean {
    return this.isList;
  }

  /** класс навешиваемый на контейнер если он имеет тип error-... */
  @HostBinding('class.ngispui-notification_error')
  get notificationErrorClass(): boolean {
    return this._typeNotification === 'error';
  }
  /** класс навешиваемый на контейнер если он имеет тип normal-... */
  @HostBinding('class.ngispui-notification_normal')
  get notificationNormalClass(): boolean {
    return this._typeNotification === 'normal';
  }

  /** класс навешиваемый на контейнер если он имеет тип rest-... */
  @HostBinding('class.ngispui-notification_rest')
  get notificationRestClass(): boolean {
    return this._typeNotification === 'rest';
  }

  /** вызывает событие при нажатии на уведомление, передает id наружу */
  @HostListener('click', ['$event'])
  onClickHandler(): void {
    this.onClick.emit(this.id);
  }

  /**
   * Возвращает классы для ссылки в уведомлении
   */
  get linkClasses(): Set<string> {
    const classes = new Set<string>();
    classes.add('ngispui-notification__link');
    classes.add(`ngispui-notification__link_${this._linkType}`);
    return classes;
  }

  /** вызывает событие при нажатии на кнопку закрытия уведомления, передает id наружу */
  public onCloseHandler(): void {
    this.onClose.emit(this.id);
  }

  /** вызывает событие при нажатии на ссылку в уведомлении, передает id наружу */
  public onLinkClick(e: Event): void {
    e.stopPropagation();
    this.linkClick.emit(this.id);
  }
}
