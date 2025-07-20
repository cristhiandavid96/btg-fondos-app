import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Fondo } from "../models/fondos.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-fondo-card',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./fondo-card.component.scss'],
  template: `
    <div class="card">
      <h3>{{ fondo.nombre }}</h3>
      <p>Monto mínimo: {{ fondo.montoMinimo | currency: 'COP' }}</p>
      <span class="badge">{{ fondo.categoria }}</span>

      <div class="acciones">
        <button *ngIf="!fondo.suscrito"  (click)="onSuscribirse()">Suscribirse</button>
        <button *ngIf="fondo.suscrito" class="cancelar" (click)="onCancelar()">Cancelar</button>
      </div>
    </div>
  `
})
export class FondoCardComponent {
  @Input() fondo!: Fondo;
  @Output() suscribirse = new EventEmitter<Fondo>();
  @Output() cancelar = new EventEmitter<Fondo>();

  onSuscribirse() {
    this.suscribirse.emit(this.fondo);
  }

  onCancelar() {
    this.cancelar.emit(this.fondo);
  }
}
