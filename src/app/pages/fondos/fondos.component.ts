import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Fondo } from '../../core/models/fondos.model';
import { FondosService } from '../../core/services/fondos.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { HistorialService } from '../../core/services/historial.service';
import { FondoCardComponent } from '../../shared/components/card/fondo-card.component';
import { TextosService } from '../../core/services/textos.service';

@Component({
  selector: 'app-fondos',
  standalone: true,
  imports: [CommonModule, FondoCardComponent, AsyncPipe],
  templateUrl: './fondos.component.html',
  styleUrls: ['./fondos.component.scss'],
})
export class FondosComponent implements OnInit {
  readonly textos = inject(TextosService);
  readonly fondosService = inject(FondosService);
  readonly usuarioService = inject(UsuarioService);
  readonly historialService = inject(HistorialService);

  saldo$ = new BehaviorSubject<number>(500000);
  fondos$ = new BehaviorSubject<Fondo[]>([]);
  errorMsg = '';

  ngOnInit(): void {
    this.usuarioService.obtenerUsuario().subscribe({
      next: usuario => this.saldo$.next(usuario.saldo),
      error: () => this.setError('No se pudo obtener el usuario')
    });

    this.fondosService.getFondos().subscribe({
      next: fondos => this.fondos$.next(fondos),
      error: () => this.setError('No se pudo obtener los fondos')
    });
    // Para borrar historial, descomenta la siguiente línea:
    // this.deleteHistorial();
  }

  private setError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 4000); // Limpia el error después de 4s
  }

  private actualizarSaldo(nuevoSaldo: number) {
    this.saldo$.next(nuevoSaldo);
    this.usuarioService.actualizarSaldo(nuevoSaldo).subscribe();
  }

  /* Métodos para manejar suscripciones y cancelaciones de fondos
    * */
  onSuscribirse(fondo: Fondo) {
    const saldo = this.saldo$.value;
    if (saldo < fondo.montoMinimo) {
      this.setError(`❌ No tienes saldo suficiente para suscribirte a ${fondo.nombre}`);
      return;
    }
    this.actualizarSaldo(saldo - fondo.montoMinimo);
    this.errorMsg = '';
    this.fondosService.actualizarFondo({ ...fondo, suscrito: true }).subscribe(() => {
      this.actualizarFondosLocal(fondo.id.toString(), true);
    });

    this.historialService.agregarTransaccion({
      id: Date.now().toString(),
      fondo: fondo.nombre,
      tipo: 'suscripcion',
      monto: fondo.montoMinimo,
      fecha: new Date().toISOString(),
      metodoNotificacion: fondo.metodoNotificacion
    }).subscribe();
  }

  /* Métodos para manejar  cancelaciones de fondos
    * */
  onCancelar(fondo: Fondo) {
    const saldo = this.saldo$.value;
    this.actualizarSaldo(saldo + fondo.montoMinimo);
    this.fondosService.actualizarFondo({ ...fondo, suscrito: false }).subscribe(() => {
      this.actualizarFondosLocal(fondo.id.toString(), false);
    });
    this.errorMsg = '';

    this.historialService.obtenerHistorial().subscribe(historial => {
      const transaccion = historial.find(
        t => t.fondo === fondo.nombre && t.tipo === 'suscripcion'
      );
      if (transaccion) {
        this.historialService.borrarTransaccion(transaccion.id).subscribe();
      }
    });

    this.historialService.agregarTransaccion({
      id: Date.now().toString(),
      fondo: fondo.nombre,
      tipo: 'cancelacion',
      monto: fondo.montoMinimo,
      fecha: new Date().toISOString(),
      metodoNotificacion: fondo.metodoNotificacion,
    }).subscribe();
  }

  /* Método para actualizar los fondos localmente
    * */
  private actualizarFondosLocal(id: string, suscrito: boolean) {
    this.fondos$.next(
      this.fondos$.value.map(f =>
        f.id.toString() === id ? { ...f, suscrito } : f
      )
    );
  }

  /* Método para borrar el historial de transacciones
    * */
  deleteHistorial() {
    this.historialService.obtenerHistorial().subscribe(historial => {
      historial.forEach(item => {
        this.historialService.borrarTransaccion(item.id).subscribe();
      });
    });
  }
}