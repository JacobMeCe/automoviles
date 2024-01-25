import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

// Interfaces
import { Service } from '../../../../../interface/datos-solicitud/service.interface';
import { Insurance } from '../../../../../interface/datos-solicitud/insurance.interface';
import { Fuel } from '../../../../../interface/datos-solicitud/fuel.interface';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss'],
})
export class DatosSolicitudComponent {
  data: any;
  id: any;
  folio = '';
  nombre = '';
  apellido_pat = '';
  apellido_mat = '';
  fecha_naciemiento = '';
  observaciones = '';
  busqueda: any;
  estado: any;
  estatus: any;

  // start test
  currentPage = {
    services: 1,
    insurances: 1,
    fuels: 1,
  };

  services: Service[] = [];
  insurances: Insurance[] = [];
  fuels: Fuel[] = [];
  // end test

  constructor(
    private api: GeneralService,
    private router: Router,
    private activo: ActivatedRoute,
    private alerta: SweetAlertService,
  ) {
    this.generateTestData();
  }

  generateTestData() {
    for (let i = 0; i < 7; i++) {
      const service: Service = {
        date: new Date(),
        description: `Servicio ${i + 1}`,
        cost: 500 * (i + 1),
        kilometers: 10000 * (i + 1),
      };

      const insurance: Insurance = {
        date: new Date(),
        description: `Seguro ${i + 1}`,
      };

      const fuels: Fuel = {
        date: new Date(),
        folio: `ABC1230000${i + 1}`,
        fuelType: 'gasoline',
        liters: 50 * (i + 1),
      };

      this.services.push(service);
      this.insurances.push(insurance);
      this.fuels.push(fuels);
    }
  }

  actualizarEnCaptura() {
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(1, this.id).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then((res: any) => {
        location.reload();
      });
    });
  }

  actualizarCapturado() {
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(2, this.id).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then((res: any) => {
        location.reload();
      });
    });
  }
  actualizarNoEncontrado() {
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(3, this.id).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then((res: any) => {
        location.reload();
      });
    });
  }

  verVolver() {
    this.router.navigate(['admin/lista-solicitudes']);
  }
}
