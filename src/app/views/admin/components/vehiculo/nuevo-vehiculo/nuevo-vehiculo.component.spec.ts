import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoVehiculoComponent } from './nuevo-vehiculo.component';

describe('SolicitudesComponent', () => {
  let component: NuevoVehiculoComponent;
  let fixture: ComponentFixture<NuevoVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevoVehiculoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
