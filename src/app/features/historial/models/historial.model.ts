export type TransaccionTipo = 'suscripcion' | 'cancelacion';

export interface Transaccion {
  id: string;
  fondo: string;
  tipo: TransaccionTipo;
  monto: number;
  fecha: string; // ISO 8601: 2025-07-20T15:00:00Z
}
