import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

import { Service } from '../../../../../interface/datos-solicitud/service.interface';
import { Insurance } from '../../../../../interface/datos-solicitud/insurance.interface';
import { Fuel } from '../../../../../interface/datos-solicitud/fuel.interface';
import { VehicleForm } from '../../../../../forms/vehicleForm';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss'],
})
export class DatosSolicitudComponent {
  protected readonly vehicleForm = VehicleForm;
  protected currentPage = {
    services: 1,
    insurances: 1,
    fuels: 1,
  };
  data: any;
  estatus: any;

  constructor(
    private api: GeneralService,
    private router: Router,
    private activo: ActivatedRoute,
    private alerta: SweetAlertService,
  ) {}

  actualizarEnCaptura() {
    this.api.datosPUT(1, this.getUserId()).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then(() => {
        location.reload();
      });
    });
  }

  actualizarCapturado() {
    this.api.datosPUT(2, this.getUserId()).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then(() => {
        location.reload();
      });
    });
  }

  actualizarNoEncontrado() {
    this.api.datosPUT(3, this.getUserId()).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then(() => {
        location.reload();
      });
    });
  }

  verVolver() {
    this.router.navigate(['admin/lista-solicitudes']);
  }

  navigateToEdit() {
    this.router.navigate(['admin/solicitudes']);
  }

  fillVehicleForm() {
    this.api.getVehicleById(Number(this.getUserId())).subscribe((res: any) => {
      this.data = res.body;
      this.vehicleForm.patchValue(this.data);
    });
  }

  getServices(): Service[] {
    return [];
  }

  getInsurances(): Insurance[] {
    return [];
  }

  getFuels(): Fuel[] {
    return [];
  }

  getUserId(): string | null {
    return this.activo.snapshot.paramMap.get('id');
  }

  getUserType(): string | null {
    return localStorage.getItem('tipo');
  }
}
