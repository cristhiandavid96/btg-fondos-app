// src/app/shared/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  styleUrls: ['./navbar.component.scss'],
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/fondos">Fondos</button>
      <button mat-button routerLink="/historial">Historial</button>
    </mat-toolbar>
  `
})
export class NavbarComponent {}
