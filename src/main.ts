import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstraps the standalone Angular application with the provided configuration.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Application Bootstrap Error:', err));
