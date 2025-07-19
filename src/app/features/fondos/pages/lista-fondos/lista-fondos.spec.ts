import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFondos } from './lista-fondos';

describe('ListaFondos', () => {
  let component: ListaFondos;
  let fixture: ComponentFixture<ListaFondos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFondos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFondos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
