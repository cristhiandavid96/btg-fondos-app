import { TextosService } from './textos.service';

describe('TextosService', () => {
  let httpMock: any;
  let service: TextosService;

  beforeEach(() => {
    httpMock = { get: jest.fn() };
    service = new TextosService(httpMock);
  });

  it('debería obtener un texto existente', () => {
    service['textos'] = { saludo: 'Hola' };
    expect(service.get('saludo')).toBe('Hola');
  });

  it('debería retornar clave si no existe el texto', () => {
    service['textos'] = {};
    expect(service.get('noExiste')).toBe('??noExiste??');
  });
});