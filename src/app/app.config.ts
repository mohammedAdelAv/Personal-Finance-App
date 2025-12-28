import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

// HTTPS
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { loaderInterceptor } from './core/interceptors/loader-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // HTTPS
    provideHttpClient(withInterceptors([loaderInterceptor])),

    // required animations providers
    provideAnimations(),
    // Toastr providers
    provideToastr({
      timeOut: 8000,
      extendedTimeOut: 2000,
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
      onActivateTick: true,
    }),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};

