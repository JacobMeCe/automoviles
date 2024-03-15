import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AseguranzaForm } from './form/aseguranza.form';
import { Aseguranza } from '../../../../../../../interface/automovil/registros-automovil/aseguranza.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aseguranza',
  templateUrl: './aseguranza.component.html',
  styleUrls: ['./aseguranza.component.scss'],
})
export class AseguranzaComponent {
  protected aseguranzaForm: FormGroup<any>;

  constructor(private activo: ActivatedRoute) {
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
   * @param form
   */
  postForm(form: Aseguranza): void {
    form.PLACAS = <string>this.getPlacas();

    if (this.aseguranzaForm.invalid) {
      console.log('Error de solicitud');
      return;
    }
    console.log('Formulario enviado');
  }
}
