import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let httpMock: any;
  let service: UsuarioService;

  beforeEach(() => {
    httpMock = { get: jest.fn(), patch: jest.fn() };
    service = new UsuarioService(httpMock);
  });

  it('debería obtener el usuario', () => {
    service.obtenerUsuario();
    expect(httpMock.get).toHaveBeenCalledWith('http://localhost:3000/usuario/1');
  });

  it('debería actualizar el saldo', () => {
    service.actualizarSaldo(1000);
    expect(httpMock.patch).toHaveBeenCalledWith('http://localhost:3000/usuario/1', { saldo: 1000 });
  });
});