import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFondo } from './detalle-fondo';

describe('DetalleFondo', () => {
  let component: DetalleFondo;
  let fixture: ComponentFixture<DetalleFondo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleFondo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleFondo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
