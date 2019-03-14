# Компонент ngispui-notification

## 1.1.0 (07.09.2018)

- `changes` добавлено событие `linkClick` на клик по ссылке в уведомлении
- `changes` нотификация отображается поверх оверлея модалки, исправлен `z-index`
- `changes` нотификации привязаны к окну браузер (области видимости), `position: fixed` вместо `absolute`
- `changes` анимации списка переделана, чтобы было понятно откуда появляются новые уведомления

  ссылка на билд: `"@ngispui/notification": "git+ssh://git@gitlab-dev.ispsystem.net:frontend/common/ng-isp-ui-builds.git#notification_1.1.0_fa5fe47"`

## 1.0.1 (30.08.2018)

- `fix` исправлена ошибка если при `ngOnDestroy` сервиса `domOutlet === undefined`

  ссылка на билд: `"@ngispui/notification": "git+ssh://git@gitlab-dev.ispsystem.net:frontend/common/ng-isp-ui-builds.git#notification_1.0.1_d895569"`

## 1.0.0 (19.07.2018)

- `changes` - Обновлен до Angular 6

  ссылка на билд - `"@ngispui/notification": "git+ssh://git@gitlab-dev.ispsystem.net:frontend/common/ng-isp-ui-builds.git#notification_1.0.0"`
