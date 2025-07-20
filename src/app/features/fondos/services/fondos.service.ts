import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fondo } from '../models/fondos.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FondosService {
  private readonly apiUrl = 'http://localhost:3000/fondos';

  constructor(private http: HttpClient) {}

  getFondos(): Observable<Fondo[]> {
    return this.http.get<Fondo[]>(this.apiUrl);
  }

  actualizarFondo(fondo: Fondo): Observable<Fondo> {
    return this.http.patch<Fondo>(`http://localhost:3000/fondos/${fondo.id}`, { suscrito: fondo.suscrito });
  }

}
