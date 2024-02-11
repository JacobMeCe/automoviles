import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent {
  documento: any;
  spinner = false;
  data: any;
  data1: any;
  data2: any;
  conteo: any;
  conteo1: any;
  conteo2: any;
  reponsable: any;
  datos: any;
  pages: number = 1;

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
      this.data = res.body;

      this.conteo = res.body.length;
      // console.log(this.conteo);

      this.spinner = false;
    });
  }

  verDetalles() {
    this.router.navigate(['admin/datos-solitud', 1]);
  }

  verVolver() {
    this.router.navigate(['admin/solicitudes']);
  }

  buscar(): void {
    const columName: string = this.cbCampo.nativeElement.value;
    const value: any = this.ctCadena.nativeElement.value;

    if (value.length) {
      // console.log('entra buscar');
      this.api.buscar(columName, value).subscribe((res: any) => {
        this.data = res.body;
        // console.log('entra buscar');
      });
    } else {
      this.reponsable = localStorage.getItem('tipo');

      this.spinner = true;
      this.api.listaSolicitudes().subscribe((res: any) => {
        this.data = res.body;
        // console.log(this.data);

        this.conteo = res.body.length;
        // console.log(this.conteo);

        this.spinner = false;
      });
    }
  }

  cambio() {
    this.pages = 1;
  }

  agregarBtn() {
    this.router.navigate(['admin/solicitudes']);
  }
}
