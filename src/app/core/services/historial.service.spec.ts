import { TransaccionTipo } from '../models/historial.model';
import { HistorialService } from './historial.service';

describe('HistorialService', () => {
  let httpMock: any;
  let service: HistorialService;

  beforeEach(() => {
    httpMock = { get: jest.fn(), post: jest.fn(), delete: jest.fn() };
    service = new HistorialService(httpMock);
  });

  it('debería obtener el historial', () => {
    service.obtenerHistorial();
    expect(httpMock.get).toHaveBeenCalledWith('http://localhost:3000/historial');
  });
  it('debería agregar una transacción', () => {
    // Usa un valor válido para TransaccionTipo, por ejemplo 'suscripcion'
    const transaccion = { id: '1', fondo: 'Test', tipo: 'suscripcion' as TransaccionTipo, monto: 100, fecha: '2024-01-01' };
    service.agregarTransaccion(transaccion);
    expect(httpMock.post).toHaveBeenCalledWith('http://localhost:3000/historial', transaccion);
  });
  it('debería borrar una transacción', () => {
    service.borrarTransaccion('1');
    expect(httpMock.delete).toHaveBeenCalledWith('http://localhost:3000/historial/1');
  });
});