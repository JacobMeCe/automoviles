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

  constructor(
    private api: GeneralService,
    private router: Router,
    private automovilService: AutomovilGeneralService,
  ) {
    this.currentPage = 1;
  }

  ngOnInit() {
    this.getListaAutomoviles();
    /*
    this.reponsable = localStorage.getItem('tipo');

    this.spinner = true;
    this.api.listaAutomoviles().subscribe((res: any) => {
      this.automoviles = res.body;

      this.conteo = res.body.length;
      // console.log(this.conteo);

      this.spinner = false;
    });
     */
  }

  buscar(): void {
    /*
    const columName: string = this.cbCampo.nativeElement.value;
    const value: any = this.ctCadena.nativeElement.value;

    if (value !== '') {
      this.api.buscar(columName, value).subscribe((res: any) => {
        this.automoviles = res.body;
      });
    } else {
      this.reponsable = localStorage.getItem('tipo');

      this.spinner = true;
      this.api.listaAutomoviles().subscribe((res: any) => {
        this.automoviles = res.body;

        this.conteo = res.body.length;

        this.spinner = false;
      });
    }

     */
  }

  getListaAutomoviles(): void {
    this.automovilService.getAutomoviles().subscribe((res: RespuestaAPI) => {
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
