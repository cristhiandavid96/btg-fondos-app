import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondosComponent } from './fondos';

describe('Fondos', () => {
  let component: FondosComponent;
  let fixture: ComponentFixture<FondosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FondosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
