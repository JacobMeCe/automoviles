import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { Automovil } from '../../../../../../interface/automovil/automovil.interface';
import { RespuestaAPI } from '../../../../../../interface/general/api-responses.model';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculos.component.html',
  styleUrls: ['./lista-vehiculos.component.scss'],
})
export class ListaVehiculosComponent {
  protected automoviles: Automovil[];
  protected currentPage: number;
  protected searchTerm: string = '';
  protected selectedFilter: string = 'PLACAS';

  constructor(
    private api: GeneralService,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getListaAutomoviles();
  }

  /**
   * Realiza una búsqueda en la lista de automóviles
   */
  buscar(): void {
    const searchTerm = this.searchTerm.trim().toUpperCase();

    if (searchTerm !== '') {
      this.automoviles = this.automoviles.filter((automovil: Automovil) => {
        const value = automovil[this.selectedFilter as keyof Automovil];
        return value ? value.includes(searchTerm) : false;
      });
      return;
    }

    this.getListaAutomoviles();
  }

  /**
   * Obtiene la lista de automóviles desde la API
   */
  getListaAutomoviles(): void {
    this.api.listaAutomoviles().subscribe((res: RespuestaAPI) => {
      if (res.status === 200) {
        this.automoviles = res.body;
      } else {
        this.automoviles = [];
      }
    });
  }

  /**
   * Obtiene el tipo de usuario actual desde el localStorage
   * @returns string | null
   */
  getUserType(): string | null {
    return localStorage.getItem('tipo');
  }

  /**
   * Navega a la vista de registro de un nuevo automóvil
   */
  navigateToRegister(): void {
    this.router.navigate(['admin/vehiculos/nuevo']);
  }

  /**
   * Navega a la vista de detalles de un automóvil
   * @param automovil
   */
  navigateToDetails(automovil: Automovil): void {
    this.router.navigate([`admin/vehiculos/${automovil.PLACAS}/detalles`]);
  }
}
