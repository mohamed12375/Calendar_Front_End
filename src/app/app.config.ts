import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptorProvider } from "./providers/InterceptorProvider";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideAnimations(),
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     importProvidersFrom(TuiRootModule),
     AuthInterceptorProvider,
     provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient with interceptors
    ]
};

export class AppModule {}
