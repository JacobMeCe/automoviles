import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

import { Servicio } from '../../../../../../interface/automovil/registros-automovil/servicio.interface';
import { Aseguranza } from '../../../../../../interface/automovil/registros-automovil/aseguranza.interface';
import { Combustible } from '../../../../../../interface/automovil/registros-automovil/combustible.interface';
import { AutomovilForm } from '../nuevo-automovil/form/automovil.form';
import { FormGroup } from '@angular/forms';
import { RespuestaAPI } from '../../../../../../interface/general/api-responses.model';

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
          this.servicios = res.body;
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
          this.aseguranzas = res.body;
        }
      });
    }
  }

  /**
   * Obtiene los registros de combustibles del automovil desde la API
   */
  getRegistrosCombustibles(): void {
    const placas = this.getPlacas();
    if (placas) {
      this.api.listaCombustibles().subscribe((res: RespuestaAPI) => {
        if (res.status === 200) {
          this.combustibles = res.body;
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
      this.api.detallesAutomovil(placas).subscribe((res: RespuestaAPI) => {
        if (res.status === 200) {
          this.automovilForm.setValue(res.body);
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
   * Navega a la lista de automoviles y limpia el formulario
   */
  navigateToList(): void {
    this.router.navigate(['admin/automoviles/lista']);
    this.automovilForm.reset();
  }

  /**
   * Navega a la edición del automovil
   */
  navigateToEdit(): void {}
}
