import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompartidoComponent } from './menu-compartido.component';

describe('MenuCompartidoComponent', () => {
  let component: MenuCompartidoComponent;
  let fixture: ComponentFixture<MenuCompartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCompartidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCompartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
