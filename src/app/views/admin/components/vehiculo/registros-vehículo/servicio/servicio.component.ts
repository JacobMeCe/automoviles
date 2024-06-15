import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServicioForm } from './form/servicio.form';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../../../../../services/sweet-alert.service';
import { DetallesVehiculoComponent } from '../../detalles-vehiculo/detalles-vehiculo.component';
import { RespuestaAPI } from '../../../../../../../interface/general/api-responses.model';
import { GeneralService } from '../../../../../../../services/general.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent {
  protected readonly servicioForm: FormGroup<any>;
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(
    private readonly activo: ActivatedRoute,
    private readonly alerts: SweetAlertService,
    private readonly api: GeneralService,
    private readonly detallesAutomovil: DetallesVehiculoComponent,
  ) {
    this.servicioForm = ServicioForm;
  }

  /**
   * Function to get placas from URL
   * @returns string | null
   */
  getPlacas(): string | null {
    return this.activo.snapshot.paramMap.get('placas');
  }

  /**
   * Function to post form data to API
   */
  postForm(): void {
    this.servicioForm.patchValue({ PLACAS: this.getPlacas() });

    if (this.servicioForm.invalid) {
      this.alerts.alertaError('Error de solicitud', 'Todos los campos son obligatorios');
      return;
    }

    this.alerts.realizado('Registro exitoso', 'El registro se ha guardado correctamente').then(() => {
      this.api.nuevoServicio(this.servicioForm.value).subscribe((response: RespuestaAPI) => {
        if (response.status === 200) {
          this.updateRegistrosServicios();
          this.servicioForm.reset();
          this.dismissModal();
        } else {
          this.alerts.alertaError('Error al guardar', response.json);
        }
      });
    });
  }

  /**
   * Function to update registros servicios
   */
  updateRegistrosServicios(): void {
    this.detallesAutomovil.getRegistrosServicios();
  }

  /**
   * Function to dismiss modal
   */
  dismissModal(): void {
    this.closeButton.nativeElement.click();
  }
}
