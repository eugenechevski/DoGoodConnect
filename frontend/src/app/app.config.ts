import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
provideZoneChangeDetection()

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideZoneChangeDetection({ eventCoalescing: true })]
};
