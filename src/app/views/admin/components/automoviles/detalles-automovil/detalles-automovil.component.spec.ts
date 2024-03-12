import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAutomovilComponent } from './detalles-automovil.component';

describe('DatosSolicitudComponent', () => {
  let component: DetallesAutomovilComponent;
  let fixture: ComponentFixture<DetallesAutomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesAutomovilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
