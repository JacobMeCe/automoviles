import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

import { Servicio } from '../../../../../../interface/automovil/registros-automovil/servicio.interface';
import { Aseguranza } from '../../../../../../interface/automovil/registros-automovil/aseguranza.interface';
import { Combustible } from '../../../../../../interface/automovil/registros-automovil/combustible.interface';
import { AutomovilForm } from '../nuevo-automovil/form/automovil.form';

@Component({
  selector: 'app-detalles-automovil',
  templateUrl: './detalles-automovil.component.html',
  styleUrls: ['./detalles-automovil.component.scss'],
})
export class DetallesAutomovilComponent {
  protected readonly vehicleForm = AutomovilForm;
  protected currentPage = {
    servicios: 1,
    aseguranzas: 1,
    combustible: 1,
  };
  data: any;
  estatus: any;

  constructor(
    private api: GeneralService,
    private router: Router,
    private activo: ActivatedRoute,
    private alerta: SweetAlertService,
  ) {}

  getRegistrosServicios(): Servicio[] {
    return [];
  }

  getRegistrosAseguranzas(): Aseguranza[] {
    return [];
  }

  getRegistrosCombustibles(): Combustible[] {
    return [];
  }

  getUserType(): string | null {
    return localStorage.getItem('tipo');
  }

  getAumovilId(): string | null {
    return this.activo.snapshot.paramMap.get('id');
  }

  navigateToList(): void {
    this.router.navigate(['admin/automovil/lista']);
  }

  navigateToEdit(): void {
    //this.router.navigate([`admin/automovil/${1}/editar`]);
  }
}
