export interface Fondo {
  id: number;
  nombre: string;
  montoMinimo: number;
  categoria: 'FPV' | 'FIC';
  suscrito?: boolean;
}
