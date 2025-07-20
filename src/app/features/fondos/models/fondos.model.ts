export type MetodoNotificacion = 'email' | 'sms';
export interface Fondo {
  id: number;
  nombre: string;
  montoMinimo: number;
  categoria: 'FPV' | 'FIC';
  suscrito?: boolean;
  metodoNotificacion?: MetodoNotificacion;
}
