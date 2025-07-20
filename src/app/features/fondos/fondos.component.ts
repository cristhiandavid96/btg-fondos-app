import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule,AsyncPipe} from '@angular/common';
import { FondosService } from './services/fondos.service';
import { FondoCardComponent } from './components/fondo-card.component';
import { Fondo } from './models/fondos.model';
import { BehaviorSubject } from 'rxjs';


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

  ngOnInit(): void {
  this.fondosService.getFondos().subscribe(data => {
  this.fondos$.next(data.map(f => ({ ...f, suscrito: false })));
  });
  }

  
    onSuscribirse(fondo: Fondo) {
    const saldo = this.saldo$.value;

    if (saldo < fondo.montoMinimo) {
      this.errorMsg = `❌ No tienes saldo suficiente para suscribirte a ${fondo.nombre}`;
      return;
    }

    this.saldo$.next(saldo - fondo.montoMinimo);
    this.fondos$.next(this.fondos$.value.map(f =>
      f.id === fondo.id ? { ...f, suscrito: true } : f
    ));
    this.errorMsg = '';
    }

    onCancelar(fondo: Fondo) {
      const saldo = this.saldo$.value;
      this.saldo$.next(saldo + fondo.montoMinimo);
      this.fondos$.next(this.fondos$.value.map(f =>
        f.id === fondo.id ? { ...f, suscrito: false } : f
      ));
      this.errorMsg = '';
    }

}
