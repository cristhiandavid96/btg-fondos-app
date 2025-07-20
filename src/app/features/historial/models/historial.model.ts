export type TransaccionTipo = 'suscripcion' | 'cancelacion';
export type MetodoNotificacion = 'email' | 'sms';
export interface Transaccion {
  id: string;
  fondo: string;
  tipo: TransaccionTipo;
  monto: number;
  fecha: string; 
  metodoNotificacion?: MetodoNotificacion;
}
