import { HistorialService } from '../historial/services/historial.service';
import { FondoCardComponent } from './components/fondo-card.component';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule,AsyncPipe} from '@angular/common';
import { FondosService } from './services/fondos.service';
import { Fondo } from './models/fondos.model';
import { BehaviorSubject } from 'rxjs';
import { UsuarioService } from './services/usuario.service';


@Component({
  selector: 'app-fondos',
  standalone: true,
  imports: [CommonModule, FondoCardComponent, AsyncPipe],
  templateUrl: './fondos.component.html',
  styleUrls: ['./fondos.component.scss'],
})
export class FondosComponent implements OnInit {
  fondosService = inject(FondosService);
  saldo$ = new BehaviorSubject<number>(500000);
  fondos$ = new BehaviorSubject<Fondo[]>([]);
  errorMsg = '';
  private readonly historialService = inject(HistorialService);
  usuarioService = inject(UsuarioService);

  ngOnInit(): void {
  this.usuarioService.obtenerUsuario().subscribe(usuario => {
      this.saldo$.next(usuario.saldo);
    });
    this.fondosService.getFondos().subscribe(fondos => {
      this.fondos$.next(fondos);
    });
  // this.delete()
  }

  delete(){
    this.historialService.obtenerHistorial().subscribe(historial => {
      historial.forEach(item => {
        this.historialService.borrarTransaccion(item.id).subscribe();
      });
    });
  }

  onSuscribirse(fondo: Fondo) {
    const saldo = this.saldo$.value;
    const nuevoSaldo = saldo - fondo.montoMinimo;
    this.saldo$.next(nuevoSaldo);
    this.usuarioService.actualizarSaldo(nuevoSaldo).subscribe();

    if (saldo < fondo.montoMinimo) {
      this.errorMsg = `❌ No tienes saldo suficiente para suscribirte a ${fondo.nombre}`;
      return;
    }

    this.saldo$.next(saldo - fondo.montoMinimo);
    this.errorMsg = '';
    this.fondosService.actualizarFondo({ ...fondo, suscrito: true }).subscribe(() => {
      this.fondos$.next(this.fondos$.value.map(f =>
        f.id === fondo.id ? { ...f, suscrito: true } : f
      ));
    });
    this.historialService.agregarTransaccion({
      id: Date.now().toString(),
      fondo: fondo.nombre,
      tipo: 'suscripcion',
      monto: fondo.montoMinimo,
      fecha: new Date().toISOString()
    }).subscribe();
    }

   onCancelar(fondo: Fondo) {
    const saldo = this.saldo$.value;
    const nuevoSaldo = saldo + fondo.montoMinimo;
    this.saldo$.next(nuevoSaldo);
    this.usuarioService.actualizarSaldo(nuevoSaldo).subscribe();
    this.fondosService.actualizarFondo({ ...fondo, suscrito: false }).subscribe(() => {
      this.fondos$.next(this.fondos$.value.map(f =>
        f.id === fondo.id ? { ...f, suscrito: false } : f
      ));
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
 }

}
