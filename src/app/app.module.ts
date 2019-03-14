import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgISPUINotificationModule } from 'src/lib/notification';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgISPUINotificationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
