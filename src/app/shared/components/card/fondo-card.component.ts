import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Fondo } from "../../../core/models/fondos.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fondo-card',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  styleUrls: ['./fondo-card.component.scss'],
  template: `
    <div class="card">
      <h3>{{ fondo.nombre }}</h3>
      <p>{{ minimumAmountLabel }}<b>{{ fondo.montoMinimo | currency: 'COP' }}</b></p>
      <span class="badge">{{ fondo.categoria }}</span>

      <div class="notificacion-selector" *ngIf="!fondo.suscrito">
        <label for="metodoNotificacion">{{ notificationMethodLabel }}</label>
        <select id="metodoNotificacion" [(ngModel)]="metodoNotificacion">
          <option value="email">{{ emailLabel }}</option>
          <option value="sms">{{ smsLabel }}</option>
        </select>
      </div>

      <div class="acciones">
        <button mat-raised-button color="primary" *ngIf="!fondo.suscrito" (click)="onSuscribirse()">
          {{ subscribeLabel }}
        </button>
        <button mat-raised-button color="accent" *ngIf="fondo.suscrito" (click)="onCancelar()">
          {{ cancelLabel }}
        </button>
      </div>
    </div>
  `
})
export class FondoCardComponent {
  @Input() fondo!: Fondo;
  @Input() minimumAmountLabel = '';
  @Input() notificationMethodLabel = '';
  @Input() emailLabel = '';
  @Input() smsLabel = '';
  @Input() subscribeLabel = '';
  @Input() cancelLabel = '';
  @Output() suscribirse = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  metodoNotificacion: 'email' | 'sms' = 'email';

  onSuscribirse() {    
    this.suscribirse.emit({
      ...this.fondo,
      metodoNotificacion: this.metodoNotificacion
    });
  }

  onCancelar() {
    this.cancelar.emit({
      ...this.fondo,
      metodoNotificacion: this.metodoNotificacion
    });
  }
}