import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutomovilesComponent } from './lista-automoviles.component';

describe('ListaComponent', () => {
  let component: ListaAutomovilesComponent;
  let fixture: ComponentFixture<ListaAutomovilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAutomovilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAutomovilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
