import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import {HomeComponent} from './features/home/home';


export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent) },
  { path: 'scan', loadComponent: () => import('./features/scan/scan').then(m => m.ScanComponent) },
  { path: 'challenge/:cp', loadComponent: () => import('./features/challenge/challenge').then(m => m.ChallengeComponent) },
  { path: 'progress', loadComponent: () => import('./features/progress/progress').then(m => m.ProgressComponent) },
  { path: '**', redirectTo: '' }
];


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
  ]
};
