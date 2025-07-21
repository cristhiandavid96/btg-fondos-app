import { FondosService } from './fondos.service';

describe('FondosService', () => {
  let httpMock: any;
  let service: FondosService;

  beforeEach(() => {
    httpMock = { get: jest.fn(), patch: jest.fn() };
    service = new FondosService(httpMock);
  });

  it('debería obtener los fondos', () => {
    service.getFondos();
    expect(httpMock.get).toHaveBeenCalledWith('http://localhost:3000/fondos');
  });

  it('debería actualizar un fondo', () => {
    const fondo = { id: 1, nombre: 'Test Fondo', suscrito: true, montoMinimo: 1000, categoria: "FPV" as "FPV" | "FIC"};
    service.actualizarFondo(fondo);
    expect(httpMock.patch).toHaveBeenCalledWith('http://localhost:3000/fondos/1', fondo);
  });
});