import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page.component';
import { ResultComponent } from './pages/results.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Do Good'
  },
  {
    path: 'results',
    component: ResultComponent,
    title: 'Results'
  }
];
