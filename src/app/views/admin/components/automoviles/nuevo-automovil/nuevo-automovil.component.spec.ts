import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAutomovilComponent } from './nuevo-automovil.component';

describe('SolicitudesComponent', () => {
  let component: NuevoAutomovilComponent;
  let fixture: ComponentFixture<NuevoAutomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevoAutomovilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
