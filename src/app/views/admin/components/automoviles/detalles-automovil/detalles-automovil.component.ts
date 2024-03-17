import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

import { Servicio } from '../../../../../../interface/automovil/registros-automovil/servicio.interface';
import { Aseguranza } from '../../../../../../interface/automovil/registros-automovil/aseguranza.interface';
import { Combustible } from '../../../../../../interface/automovil/registros-automovil/combustible.interface';
import { AutomovilForm } from '../nuevo-automovil/form/automovil.form';
import { FormGroup } from '@angular/forms';
import { AutomovilGeneralService } from '../../../../../../services/test/automovil-general.service';
import { RespuestaAPI } from '../../../../../../interface/general/api-responses.model';
import { RecordsGeneralService } from '../../../../../../services/test/records-general.service';

@Component({
  selector: 'app-detalles-automovil',
  templateUrl: './detalles-automovil.component.html',
  styleUrls: ['./detalles-automovil.component.scss'],
})
export class DetallesAutomovilComponent {
  protected readonly automovilForm: FormGroup<any>;
  protected servicios: Servicio[];
  protected aseguranzas: Aseguranza[];
  protected combustibles: Combustible[];
  protected currentPage: any;

  constructor(
    private api: GeneralService,
    private router: Router,
    private activo: ActivatedRoute,
    private readonly automovilService: AutomovilGeneralService,
    private readonly recordsService: RecordsGeneralService,
  ) {
    this.automovilForm = AutomovilForm;
    this.currentPage = {
      servicios: 1,
      aseguranzas: 1,
      combustible: 1,
    };
  }

  ngOnInit(): void {
    this.getAutomovilDetails();
    this.getRegistrosServicios();
    this.getRegistrosAseguranzas();
    this.getRegistrosCombustibles();
  }

  getUserType(): string | null {
    return localStorage.getItem('tipo');
  }

  getPlacas(): string | null {
    return this.activo.snapshot.paramMap.get('placas');
  }

  getRegistrosServicios(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.recordsService
        .getRecordsByAutomovil('servicios', placas)
        .subscribe((res: RespuestaAPI) => {
          if (res.status === 200) {
            this.servicios = res.body;
          }
        });
    }
  }

  getRegistrosAseguranzas(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.recordsService
        .getRecordsByAutomovil('aseguranzas', placas)
        .subscribe((res: RespuestaAPI) => {
          if (res.status === 200) {
            this.aseguranzas = res.body;
          }
        });
    }
  }

  getRegistrosCombustibles(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.recordsService
        .getRecordsByAutomovil('combustibles', placas)
        .subscribe((res: RespuestaAPI) => {
          if (res.status === 200) {
            this.combustibles = res.body;
          }
        });
    }
  }

  getAutomovilDetails(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.automovilService
        .getAutomovil(placas)
        .subscribe((res: RespuestaAPI) => {
          if (res.status === 200) {
            this.automovilForm.setValue(res.body);
          }
        });
    }
  }

  navigateToList(): void {
    this.router.navigate(['admin/automoviles/lista']);
    this.automovilForm.reset();
  }

  navigateToEdit(): void {
    //this.router.navigate([`admin/automoviles/${1}/editar`]);
  }
}
