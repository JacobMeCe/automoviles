import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServicioForm } from './form/servicio.form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent {
  protected servicioForm: FormGroup<any>;

  constructor(private activo: ActivatedRoute) {
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
  postForm(form: any): void {
    form.PLACAS = <string>this.getPlacas();

    if (this.servicioForm.invalid) {
      console.log('Error de solicitud');
      return;
    }
    console.log('Formulario enviado');
  }
}
