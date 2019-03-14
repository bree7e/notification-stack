import { isPlatformBrowser } from '@angular/common';
import {
  ClassProvider,
  FactoryProvider,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core';

export const WINDOW = new InjectionToken('WindowToken');

@Injectable()
export class WindowWrapper extends Window {}

/* Define abstract class for obtaining reference to the global window object. */
export abstract class WindowRef {
  get nativeWindow(): any {
    throw new Error('Not implemented.');
  }
}

export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  get nativeWindow(): WindowWrapper | any {
    return window;
  }
}

export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: any): any {
  let windowRef = {};
  if (isPlatformBrowser(platformId)) {
    windowRef = browserWindowRef.nativeWindow;
  }
  return windowRef;
}

export const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
