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
      import('./features/fondos/fondos.component.routes').then(m => m.routes)
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./features/historial/historial.component.routes').then(m => m.routes)
  },
  {
    path: 'notificaciones',
    loadChildren: () =>
      import('./features/notificaciones/notificaciones.component.routes').then(m => m.routes)
  }
];
