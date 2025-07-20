import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'fondos',
    pathMatch: 'full'
  },
  {
    path: 'fondos',
    loadChildren: () =>
      import('./pages/fondos/fondos.component.routes').then(m => m.routes)
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./pages/historial/historial.component.routes').then(m => m.routes)
  }
];
