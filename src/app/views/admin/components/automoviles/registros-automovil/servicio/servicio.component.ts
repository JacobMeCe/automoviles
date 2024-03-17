import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServicioForm } from './form/servicio.form';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../../../../../services/sweet-alert.service';
import { RecordsGeneralService } from '../../../../../../../services/test/records-general.service';
import { DetallesAutomovilComponent } from '../../detalles-automovil/detalles-automovil.component';
import { RespuestaAPI } from '../../../../../../../interface/general/api-responses.model';

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
    private readonly recordsService: RecordsGeneralService,
    private readonly detallesAutomovil: DetallesAutomovilComponent,
  ) {
    this.servicioForm = ServicioForm;
  }

  getPlacas(): string | null {
    return this.activo.snapshot.paramMap.get('placas');
  }

  /**
   * Function to post form
   * @description This function send the form to the API
   * and show a confirmation alert
   * @param form
   */
  postForm(): void {
    this.servicioForm.patchValue({ PLACAS: this.getPlacas() });

    if (this.servicioForm.invalid) {
      this.alerts.alertaError(
        'Error de solicitud',
        'Todos los campos son obligatorios',
      );
      return;
    }

    this.alerts
      .realizado('Registro exitoso', 'El registro se ha guardado correctamente')
      .then(() => {
        this.recordsService
          .newServicio(this.servicioForm.value)
          .subscribe((response: RespuestaAPI) => {
            if (response.status === 201) {
              this.updateRegistrosServicios();
              this.servicioForm.reset();
              this.dismissModal();
            } else {
              this.alerts.alertaError('Error al guardar', response.json);
            }
          });
      });
  }

  updateRegistrosServicios(): void {
    this.detallesAutomovil.getRegistrosServicios();
  }

  dismissModal(): void {
    this.closeButton.nativeElement.click();
  }
}
