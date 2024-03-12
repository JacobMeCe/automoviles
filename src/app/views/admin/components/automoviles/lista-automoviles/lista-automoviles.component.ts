import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-lista-automoviles',
  templateUrl: './lista-automoviles.component.html',
  styleUrls: ['./lista-automoviles.component.scss'],
})
export class ListaAutomovilesComponent {
  spinner = false;
  data: any;
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
      this.data = res.body;

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
        this.data = res.body;
      });
    } else {
      this.reponsable = localStorage.getItem('tipo');

      this.spinner = true;
      this.api.listaAutomoviles().subscribe((res: any) => {
        this.data = res.body;
        // console.log(this.data);

        this.conteo = res.body.length;
        // console.log(this.conteo);

        this.spinner = false;
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['admin/automovil/nuevo']);
  }

  navigateToVehicleDetails(vehicle: any) {
    this.router.navigate([`admin/automovil/${vehicle.id}/detalles`]);
  }
}
