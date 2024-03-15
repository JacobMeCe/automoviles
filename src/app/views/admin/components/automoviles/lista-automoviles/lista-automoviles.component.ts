import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { Automovil } from '../../../../../../interface/automovil/automovil.interface';

@Component({
  selector: 'app-lista-automoviles',
  templateUrl: './lista-automoviles.component.html',
  styleUrls: ['./lista-automoviles.component.scss'],
})
export class ListaAutomovilesComponent {
  spinner = false;
  automoviles: any;
  conteo: any;
  reponsable: any;
  datos: any;
  pages: number = 1;

  userType: string = localStorage.getItem('tipo') || '';

  @ViewChild('cbCampo') cbCampo: ElementRef;
  @ViewChild('ctCadena') ctCadena: ElementRef;

  constructor(
    private api: GeneralService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.reponsable = localStorage.getItem('tipo');

    this.spinner = true;
    this.api.listaAutomoviles().subscribe((res: any) => {
      this.automoviles = res.body;

      this.conteo = res.body.length;
      // console.log(this.conteo);

      this.spinner = false;
    });
  }

  buscar(): void {
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
        // console.log(this.data);

        this.conteo = res.body.length;
        // console.log(this.conteo);

        this.spinner = false;
      });
    }
  }

  getUserType(): string | null {
    return localStorage.getItem('tipo');
  }

  navigateToRegister() {
    this.router.navigate(['admin/automovil/nuevo']);
  }

  navigateToDetails(automovil: Automovil) {
    this.router.navigate([`admin/automovil/${automovil.PLACAS}/detalles`]);
  }
}
