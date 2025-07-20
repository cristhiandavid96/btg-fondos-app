import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface NavbarOption {
  label: string;
  route: string;
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  styleUrls: ['./navbar.component.scss'],
  template: `
   <mat-toolbar color="primary">
    <button
      mat-button
      *ngFor="let option of options"
      [routerLink]="option.route"
    >
      {{ option.label }}
    </button>
  </mat-toolbar>
  `
})
export class NavbarComponent  {
  @Input() options: NavbarOption[] = [];

}