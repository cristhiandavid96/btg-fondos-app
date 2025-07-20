import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaccion } from '../models/historial.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  constructor(private readonly http: HttpClient) {}

  obtenerHistorial(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>('http://localhost:3000/historial');
  }

  agregarTransaccion(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>('http://localhost:3000/historial', transaccion);
  }

  borrarTransaccion(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/historial/${id}`);
  }
}
