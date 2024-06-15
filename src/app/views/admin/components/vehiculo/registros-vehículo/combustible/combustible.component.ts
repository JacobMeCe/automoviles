import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CombustibleForm } from './form/combustible.form';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../../../../../services/sweet-alert.service';
import { DetallesVehiculoComponent } from '../../detalles-vehiculo/detalles-vehiculo.component';
import { GeneralService } from '../../../../../../../services/general.service';

@Component({
  selector: 'app-combustible',
  templateUrl: './combustible.component.html',
  styleUrls: ['./combustible.component.scss'],
})
export class CombustibleComponent {
  protected readonly combustibleForm: FormGroup<any>;
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(
    private readonly activo: ActivatedRoute,
    private readonly alerts: SweetAlertService,
    private readonly api: GeneralService,
    private readonly detallesAutomovil: DetallesVehiculoComponent,
  ) {
    this.combustibleForm = CombustibleForm;
  }

  ngOnInit() {
    // Change all inputs to uppercase
    this.combustibleForm.valueChanges.subscribe((value) => {
      for (const field in value) {
        if (typeof value[field] === 'string' && field !== 'TIPO_COMBUSTIBLE') {
          const control = this.combustibleForm.get(field);
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
    this.combustibleForm.patchValue({ PLACAS: this.getPlacas() });

    if (this.combustibleForm.invalid) {
      this.alerts.alertaError('Error de solicitud', 'Todos los campos son obligatorios');
      return;
    }

    this.alerts.realizado('Registro exitoso', 'El registro se ha guardado correctamente').then(() => {
      this.api.nuevoCombustible(this.combustibleForm.value).subscribe((response: any) => {
        if (response.status === 200) {
          this.updateRegistrosCombustibles();
          this.combustibleForm.reset();
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
  updateRegistrosCombustibles(): void {
    this.detallesAutomovil.getListaCombustible();
  }

  /**
   * Function to close the modal
   */
  dismissModal(): void {
    this.closeButton.nativeElement.click();
  }
}
