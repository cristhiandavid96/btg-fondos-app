import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:3000/usuario';

  constructor(private readonly http: HttpClient) {}

  obtenerUsuario(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  actualizarSaldo(saldo: number): Observable<any> {
    return this.http.patch<any>(this.apiUrl, { saldo });
  }
}