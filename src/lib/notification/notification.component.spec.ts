import { CommonModule } from '@angular/common';
import { Component, DebugElement, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgISPUINotificationComponent } from './notification.component';

@NgModule({
  declarations: [NgISPUINotificationComponent],
  imports: [CommonModule],
  exports: [NgISPUINotificationComponent],
  providers: [],
})
class NgISPUINotificationModule {}

describe('NgISPUINotificationComponent', () => {
  /*** Host component */
  @Component({
    selector: 'host-component',
    template: `
      <ngispui-notification
        [id]="id"
        [title]="title"
        [time]="time"
        [content]="content"
        [type]="type"
        [link]="link"
        (onClose)="onCloseHandler($event)"
        (onClick)="onClickHandler($event)"
      >
      </ngispui-notification>
    `,
  })
  class TestHostComponent {
    @ViewChild(NgISPUINotificationComponent, { static: false })
    notification: NgISPUINotificationComponent;
    type: string = 'error-fast';
    id: number = 1;
    title: string = 'Название уведомления';
    content: string = 'Контент уведомления';
    link: string = 'Ссылка';
    time: string = 'Только что';

    isClicked: boolean = false;

    onCloseHandler(id: number) {
      this.isClicked = true;
    }

    onClickHandler(id: number) {
      this.isClicked = true;
    }
  }

  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [NgISPUINotificationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создать NgISPUINotificationComponent', () => {
    const notificationFixture = TestBed.createComponent(NgISPUINotificationComponent);
    const notificationComponent = fixture.componentInstance;
    expect(notificationComponent).toBeTruthy();
  });

  it('должен создать ngispui-notification__title', () => {
    const notificationTitleElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__title'
    );
    expect(notificationTitleElement).toBeTruthy();
  });

  it('ngispui-notification__title должен содержимое передаваемое значение', () => {
    const notificationTitleElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__title'
    );
    expect(notificationTitleElement.textContent).toContain(testHostComponent.title);
  });

  it('должен менять содержимое ngispui-notification__title', () => {
    const notificationTitleElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__title'
    );
    expect(notificationTitleElement.textContent).toContain(testHostComponent.title);

    testHostComponent.title = 'Новые название уведомления';
    fixture.detectChanges();
    expect(notificationTitleElement.textContent).toContain(testHostComponent.title);
  });

  it('должен создать ngispui-notification__content', () => {
    const notificationContentElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__content'
    );
    expect(notificationContentElement).toBeTruthy();
  });

  it('ngispui-notification__content должен содержимое передаваемое значение', () => {
    const notificationContentElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__content'
    );
    expect(notificationContentElement.textContent).toContain(testHostComponent.content);
  });

  it('должен менять содержимое ngispui-notification__content', () => {
    const notificationContentElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__content'
    );
    expect(notificationContentElement.textContent).toContain(testHostComponent.content);

    testHostComponent.content = 'Новый контент уведомления';
    fixture.detectChanges();
    expect(notificationContentElement.textContent).toContain(testHostComponent.content);
  });

  it('должен создать ссылку ngispui-notification__link', () => {
    const notificationLinkElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__link'
    );
    expect(notificationLinkElement).toBeTruthy();
  });

  it('ngispui-notification__link должен содержимое передаваемое значение', () => {
    const notificationLinkElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__link'
    );
    expect(notificationLinkElement.textContent).toContain(testHostComponent.link);
  });

  it('ngispui-notification при наличии ngispui-notification__link должен иметь класс ngispui-notification_wrap-link', () => {
    const notificationElement = fixture.nativeElement.querySelector('ngispui-notification');
    expect(notificationElement.classList.contains('ngispui-notification_wrap-link')).toBeTruthy();
  });

  it('должен менять содержимое ngispui-notification__link', () => {
    const notificationLinkElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__link'
    );
    expect(notificationLinkElement.textContent).toContain(testHostComponent.link);

    testHostComponent.link = 'Новый контент уведомления';
    fixture.detectChanges();
    expect(notificationLinkElement.textContent).toContain(testHostComponent.link);
  });

  it('должен задавать типы уведомлений', () => {
    const notificationElement = fixture.nativeElement.querySelector('ngispui-notification');
    expect(notificationElement.classList.contains('ngispui-notification_error')).toBeTruthy();
    expect(notificationElement.classList.contains('ngispui-notification_is-list')).toBeFalsy();
  });

  it('должены меняться классы для ngispui-notification при изменении типов уведомлений', () => {
    const notificationElement = fixture.nativeElement.querySelector('ngispui-notification');
    expect(notificationElement.classList.contains('ngispui-notification_error')).toBeTruthy();
    expect(notificationElement.classList.contains('ngispui-notification_is-list')).toBeFalsy();

    const typesNotification: string[] = [
      'error-fast',
      'normal-fast',
      'rest-fast',
      'error-list',
      'normal-list',
      'rest-list',
    ];

    typesNotification.forEach(item => {
      testHostComponent.type = item;
      fixture.detectChanges();

      const types = item.split('-');
      const typeNotification = types[0];
      const isList = types[1] === 'list';

      expect(
        notificationElement.classList.contains(`ngispui-notification_${typeNotification}`)
      ).toBeTruthy();
      if (isList) {
        expect(notificationElement.classList.contains('ngispui-notification_is-list')).toBeTruthy();
      } else {
        expect(notificationElement.classList.contains('ngispui-notification_is-list')).toBeFalsy();
      }
    });
  });

  it('должены выводить время публикации в ngispui-notification__time', () => {
    testHostComponent.type = 'normal-list';
    fixture.detectChanges();
    const notificationTimeElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__time'
    );
    expect(notificationTimeElement.textContent).toContain('Только что');
  });

  it('должены менять время публикации в ngispui-notification__time', () => {
    testHostComponent.type = 'normal-list';
    fixture.detectChanges();
    const notificationTimeElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__time'
    );
    expect(notificationTimeElement.textContent).toContain('Только что');

    testHostComponent.time = '9 минут назад';
    fixture.detectChanges();
    expect(notificationTimeElement.textContent).toContain('9 минут назад');
  });

  it('должен создать кнопку закрытия уведомления ngispui-notification__close', () => {
    const notificationButtonCloseElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__close'
    );
    expect(notificationButtonCloseElement).toBeTruthy();
  });

  it('должно генерироваться событие onClose при нажатии по ngispui-notification__close', () => {
    const notificationButtonCloseElement = fixture.nativeElement.querySelector(
      '.ngispui-notification__close'
    );
    expect(testHostComponent.isClicked).toBeFalsy();
    notificationButtonCloseElement.click();
    expect(testHostComponent.isClicked).toBeTruthy();
  });

  it('должно генерироваться событие onClick при нажатии по банеру', () => {
    const notificationElement = fixture.nativeElement.querySelector('ngispui-notification');
    expect(testHostComponent.isClicked).toBeFalsy();
    notificationElement.click();
    expect(testHostComponent.isClicked).toBeTruthy();
  });

  it('должен генерировать событие linkClick и не генерировать onClick при нажатии по ссылке', () => {
    const linkElement = fixture.nativeElement.querySelector('.ngispui-notification__link');
    expect(testHostComponent.isClicked).toBeFalsy();
    testHostComponent.notification.linkClick.subscribe(id => expect(id).toBe(testHostComponent.id));
    linkElement.click();
    expect(testHostComponent.isClicked).toBeFalsy();
  });
});
