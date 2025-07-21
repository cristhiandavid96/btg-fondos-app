import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Transaccion } from '../../core/models/historial.model';
import { HistorialService } from '../../core/services/historial.service';
import { TextosService } from '../../core/services/textos.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent {
  private readonly historialService = inject(HistorialService);
  textos = inject(TextosService);

  readonly transacciones = signal<Transaccion[]>([]);

  /* * Obtiene el historial de transacciones del servicio y lo almacena en la señal.
   * Utiliza el método `set` de la señal para actualizar su valor.*/
  ngOnInit() {
    this.historialService.obtenerHistorial().subscribe(this.transacciones.set);
  }
}
