import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Transaccion } from '../../core/models/historial.model';
import { HistorialService } from '../../core/services/historial.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent {
  private readonly historialService = inject(HistorialService);

  readonly transacciones = signal<Transaccion[]>([]);

  ngOnInit() {
    this.historialService.obtenerHistorial().subscribe(this.transacciones.set);
  }
}
