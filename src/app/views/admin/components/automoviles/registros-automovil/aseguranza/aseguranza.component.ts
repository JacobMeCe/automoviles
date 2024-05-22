import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AseguranzaForm } from './form/aseguranza.form';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../../../../../services/sweet-alert.service';
import { DetallesAutomovilComponent } from '../../detalles-automovil/detalles-automovil.component';
import { RespuestaAPI } from '../../../../../../../interface/general/api-responses.model';
import { GeneralService } from '../../../../../../../services/general.service';

@Component({
  selector: 'app-aseguranza',
  templateUrl: './aseguranza.component.html',
  styleUrls: ['./aseguranza.component.scss'],
})
export class AseguranzaComponent {
  protected readonly aseguranzaForm: FormGroup<any>;
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(
    private readonly activo: ActivatedRoute,
    private readonly alerts: SweetAlertService,
    private readonly api: GeneralService,
    private readonly detallesAutomovil: DetallesAutomovilComponent,
  ) {
    this.aseguranzaForm = AseguranzaForm;
  }

  ngOnInit(): void {
    // Change all inputs to uppercase
    this.aseguranzaForm.valueChanges.subscribe((value) => {
      for (const field in value) {
        if (typeof value[field] === 'string' && field !== 'DESCRIPCION') {
          const control = this.aseguranzaForm.get(field);
          if (control) {
            control.setValue(value[field].toUpperCase(), { emitEvent: false });
          }
        }
      }
    });
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
    this.aseguranzaForm.patchValue({ PLACAS: this.getPlacas() });

    if (this.aseguranzaForm.invalid) {
      this.alerts.alertaError(
        'Error de solicitud',
        'Todos los campos son obligatorios',
      );
      return;
    }

    this.alerts
      .realizado('Registro exitoso', 'El registro se ha guardado correctamente')
      .then(() => {
        this.api
          .nuevaAseguranza(this.aseguranzaForm.value)
          .subscribe((response: RespuestaAPI) => {
            if (response.status === 200) {
              this.updateRegistrosAseguranzas();
              this.aseguranzaForm.reset();
              this.dismissModal();
            } else {
              this.alerts.alertaError('Error', response.json);
            }
          });
      });
  }

  /**
   * Function to update the table with the new data
   */
  updateRegistrosAseguranzas(): void {
    this.detallesAutomovil.getRegistrosAseguranzas();
  }

  /**
   * Function to close the modal
   */
  dismissModal(): void {
    this.closeButton.nativeElement.click();
  }
}
