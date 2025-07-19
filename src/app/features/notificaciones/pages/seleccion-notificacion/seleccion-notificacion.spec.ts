import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionNotificacion } from './seleccion-notificacion';

describe('SeleccionNotificacion', () => {
  let component: SeleccionNotificacion;
  let fixture: ComponentFixture<SeleccionNotificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionNotificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionNotificacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
