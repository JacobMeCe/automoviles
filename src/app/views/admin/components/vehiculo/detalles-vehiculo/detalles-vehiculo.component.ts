import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

import { Servicio } from '../../../../../../interface/automovil/registros-automovil/servicio.interface';
import { Aseguranza } from '../../../../../../interface/automovil/registros-automovil/aseguranza.interface';
import { Combustible } from '../../../../../../interface/automovil/registros-automovil/combustible.interface';
import { AutomovilForm } from '../nuevo-vehiculo/form/automovil.form';
import { FormGroup } from '@angular/forms';
import { RespuestaAPI } from '../../../../../../interface/general/api-responses.model';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-detalles-vehiculo',
  templateUrl: './detalles-vehiculo.component.html',
  styleUrls: ['./detalles-vehiculo.component.scss'],
})
export class DetallesVehiculoComponent {
  protected readonly automovilForm: FormGroup<any>;
  protected servicios: Servicio[];
  protected aseguranzas: Aseguranza[];
  protected combustibles: Combustible[];
  protected currentPage: any;

  constructor(
    private api: GeneralService,
    private router: Router,
    private activo: ActivatedRoute,
    private viewportScroller: ViewportScroller,
  ) {
    this.automovilForm = AutomovilForm;
    this.currentPage = {
      servicios: 1,
      aseguranzas: 1,
      combustible: 1,
    };
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getAutomovilDetails();
    this.getRegistrosServicios();
    this.getRegistrosAseguranzas();
    this.getListaCombustible();
  }

  /**
   * Obtiene el tipo de usuario del local storage
   * @returns tipo
   */
  getUserType(): string | null {
    return localStorage.getItem('tipo');
  }

  /**
   * Obtiene las placas del automovil desde la URL
   * @returns placas
   */
  getPlacas(): string | null {
    return this.activo.snapshot.paramMap.get('placas');
  }

  /**
   * Obtiene los registros de servicios del automovil desde la API
   */
  getRegistrosServicios(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.api.listaServicios().subscribe((res: RespuestaAPI) => {
        if (res.status === 200) {
          this.servicios = res.body.filter((servicio: Servicio) => {
            return servicio.PLACAS === placas;
          });

          // Ordenar los registros de combustible en orden descendente por 'fecha'
          this.servicios.sort((a: Servicio, b: Servicio) => {
            if (a.FECHA < b.FECHA) {
              return 1;
            } else if (a.FECHA > b.FECHA) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      });
    }
  }

  /**
   * Obtiene los registros de aseguranzas del automovil desde la API
   */
  getRegistrosAseguranzas(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.api.listaAseguranzas().subscribe((res: RespuestaAPI) => {
        if (res.status === 200) {
          this.aseguranzas = res.body.filter((aseguranza: Aseguranza) => {
            return aseguranza.PLACAS === placas;
          });

          // Ordenar los registros de combustible en orden descendente por 'fecha'
          this.aseguranzas.sort((a: Aseguranza, b: Aseguranza) => {
            if (a.FECHA < b.FECHA) {
              return 1;
            } else if (a.FECHA > b.FECHA) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      });
    }
  }

  /**
   * Obtiene los registros de combustibles del automovil desde la API
   */
  getListaCombustible(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.api.listaCombustibles().subscribe((res: RespuestaAPI) => {
        if (res.status === 200) {
          this.combustibles = res.body.filter(
            (combustible: Combustible) => combustible.PLACAS === placas,
          );

          // Ordenar los registros de combustible en orden descendente por 'fecha'
          this.combustibles.sort((a: Combustible, b: Combustible) => {
            if (a.FECHA < b.FECHA) {
              return 1;
            } else if (a.FECHA > b.FECHA) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      });
    }
  }

  /**
   * Obtiene los detalles del automovil desde la API
   */
  getAutomovilDetails(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.api.listaAutomoviles().subscribe((res: RespuestaAPI) => {
        if (res.status === 200) {
          const automovil = res.body.find(
            (auto: any) => auto.PLACAS === placas,
          );
          this.automovilForm.patchValue(automovil);
        }
      });
    }
  }

  /**
   * Obtiene la imagen del automovil
   * @returns imagen
   */
  getImage(): string {
    if (this.automovilForm.value.IMAGEN) {
      return this.automovilForm.value.IMAGEN;
    }

    return 'https://i.imgur.com/noigPmr.png';
  }

  /**
   * Navega a la lista de vehiculo y limpia el formulario
   */
  navigateToList(): void {
    this.router.navigate(['admin/vehiculos']);
    this.automovilForm.reset();
  }

  /**
   * Navega a la edición del automovil
   */
  navigateToEdit(): void {}
}
