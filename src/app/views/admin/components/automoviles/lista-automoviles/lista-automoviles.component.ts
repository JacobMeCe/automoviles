import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { Automovil } from '../../../../../../interface/automovil/automovil.interface';
import { AutomovilGeneralService } from '../../../../../../services/test/automovil-general.service';
import { RespuestaAPI } from '../../../../../../interface/general/api-responses.model';

@Component({
  selector: 'app-lista-automoviles',
  templateUrl: './lista-automoviles.component.html',
  styleUrls: ['./lista-automoviles.component.scss'],
})
export class ListaAutomovilesComponent {
  protected automoviles: Automovil[];
  protected currentPage: number;
  protected searchTerm: string = '';
  protected selectedFilter: string = 'PLACAS';

  constructor(
    private api: GeneralService,
    private router: Router,
    private automovilService: AutomovilGeneralService,
  ) {
    this.currentPage = 1;
  }

  ngOnInit() {
    this.getListaAutomoviles();
  }

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

  getListaAutomoviles(): void {
    this.api.listaAutomoviles().subscribe((res: RespuestaAPI) => {
      if (res.status === 200) {
        this.automoviles = res.body;
      } else {
        this.automoviles = [];
      }
    });
  }

  getUserType(): string | null {
    return localStorage.getItem('tipo');
  }

  navigateToRegister() {
    this.router.navigate(['admin/automoviles/nuevo']);
  }

  navigateToDetails(automovil: Automovil) {
    this.router.navigate([`admin/automoviles/${automovil.PLACAS}/detalles`]);
  }
}
