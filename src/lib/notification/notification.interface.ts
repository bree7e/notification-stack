/** типы уведомлений и баннеров  */
export type TNotifyBanner =
  | 'error-fast'
  | 'normal-fast'
  | 'rest-fast'
  | 'error-list'
  | 'normal-list'
  | 'rest-list';
export type TNotify = 'error' | 'normal' | 'rest';
export type TNotifyEvent = 'close' | 'click' | 'hide' | 'link-click';
export type TBanner = 'fast' | 'list';

/** интерфейс баннера  */
export interface INotifyBanner {
  type: TNotifyBanner;
  title: string;
  content: string;
  time?: string;
  link?: string;
  id?: number;
  timer?: NodeJS.Timer;
  linkType?: LinkType;
}

/** интерфейс события нотификации */
export interface INotifyEvent {
  type: TNotifyEvent;
  id: number;
}

/** перечисление типов ссылок */
export enum LinkType {
  /** сплошное подчеркивание */
  default = 'default',
  /** сплошное подчеркивание при наведении */
  default_hover = 'default-hover',
  /** пунктирное подчеркивание */
  dropdown = 'dropdown',
  /** пунктирное подчеркивание при наведении */
  dropdown_hover = 'dropdown-hover',
}
