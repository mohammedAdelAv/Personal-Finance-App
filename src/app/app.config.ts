import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// HTTPS
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// ngx-toastor


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // HTTPS
    provideHttpClient(),


  ]
};

