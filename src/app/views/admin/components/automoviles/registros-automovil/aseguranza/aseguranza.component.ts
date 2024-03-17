import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AseguranzaForm } from './form/aseguranza.form';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../../../../../services/sweet-alert.service';
import { DetallesAutomovilComponent } from '../../detalles-automovil/detalles-automovil.component';
import { RecordsGeneralService } from '../../../../../../../services/test/records-general.service';
import { RespuestaAPI } from '../../../../../../../interface/general/api-responses.model';

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
    private readonly recordsService: RecordsGeneralService,
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

  getPlacas(): string | null {
    return this.activo.snapshot.paramMap.get('placas');
  }

  /**
   * Function to post form
   * @description This function send the form to the API
   * and show a confirmation alert
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
        this.recordsService
          .newAseguranza(this.aseguranzaForm.value)
          .subscribe((response: RespuestaAPI) => {
            if (response.status === 201) {
              this.updateRegistrosAseguranzas();
              this.aseguranzaForm.reset();
              this.dismissModal();
            } else {
              this.alerts.alertaError('Error', response.json);
            }
          });
      });
  }

  updateRegistrosAseguranzas(): void {
    this.detallesAutomovil.getRegistrosAseguranzas();
  }

  dismissModal(): void {
    this.closeButton.nativeElement.click();
  }
}
