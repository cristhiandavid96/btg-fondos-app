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
      import('./features/fondos/fondos.routes').then(m => m.routes)
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./features/historial/historial.routes').then(m => m.routes)
  },
  {
    path: 'notificaciones',
    loadChildren: () =>
      import('./features/notificaciones/notificaciones.routes').then(m => m.routes)
  }
];
