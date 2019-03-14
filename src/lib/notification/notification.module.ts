import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgISPUINotificationGroupComponent } from './notification-group/notification-group.component';
import { NgISPUINotificationComponent } from './notification.component';
import { NgISPUINotificationService } from './notification.service';
import { DOMOUTLETCONTAINER_PROVIDER } from 'src/lib/dom-outlet';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [NgISPUINotificationComponent, NgISPUINotificationGroupComponent],
  providers: [NgISPUINotificationService, DOMOUTLETCONTAINER_PROVIDER],
  entryComponents: [NgISPUINotificationComponent, NgISPUINotificationGroupComponent],
  exports: [NgISPUINotificationComponent, NgISPUINotificationGroupComponent],
})
export class NgISPUINotificationModule {}
