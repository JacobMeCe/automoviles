import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CombustibleForm } from './form/combustible.form';
import { ActivatedRoute } from '@angular/router';
import { Combustible } from '../../../../../../../interface/automovil/registros-automovil/combustible.interface';

@Component({
  selector: 'app-combustible',
  templateUrl: './combustible.component.html',
  styleUrls: ['./combustible.component.scss'],
})
export class CombustibleComponent {
  protected combustibleForm: FormGroup<any>;

  constructor(private activo: ActivatedRoute) {
    this.combustibleForm = CombustibleForm;
  }

  ngOnInit() {
    // Change all inputs to uppercase
    this.combustibleForm.valueChanges.subscribe((value) => {
      for (const field in value) {
        if (typeof value[field] === 'string') {
          const control = this.combustibleForm.get(field);
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
  postForm(form: Combustible): void {
    form.PLACAS = <string>this.getPlacas();

    if (this.combustibleForm.invalid) {
      console.log('Error de solicitud');
      return;
    }
    console.log('Formulario enviado');
  }
}
