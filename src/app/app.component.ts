import { Component } from '@angular/core';
import { NgISPUINotificationService, TNotifyEvent } from 'src/lib/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'animo';
  constructor(private _notificationService: NgISPUINotificationService) {}

  isShow = false;

  modalContent = `
    Панель управления веб-сервером.
    Профессиональное решение для управления VPS и выделенными серверами,
    а также для продажи виртуального хостинга
  `;

  showModal() {
    this.isShow = true;
  }

  onCloseHandler() {
    this.isShow = false;
  }

  onClickFastWithLink(type: 'normal-fast' | 'error-fast' | 'rest-fast') {
    this._notificationService
      .push({
        title: 'New',
        link: 'Ссылка',
        content: new Date().getTime().toString(),
        type,
      })
      .subscribe(r => {
        switch (r.type as TNotifyEvent) {
          case 'click':
            this.clickNormalFast(
              'normal-fast',
              'Клик по уведомлению',
              'Произошел клик по уведомлению'
            );
            break;
          case 'link-click':
            this.clickNormalFast('normal-fast', 'Клик по ссылке', 'Произошел клик по ссылке');
            break;
        }
      });
  }

  clickNormalFast(
    type: 'normal-fast' | 'error-fast' | 'rest-fast',
    title: string,
    content: string
  ) {
    return this._notificationService.push({ title, content, type });
  }

  onClickFast(type: 'normal-fast' | 'error-fast' | 'rest-fast') {
    this._notificationService.push({
      title: 'New',
      content: new Date().getTime().toString(),
      type,
    });
  }
}
