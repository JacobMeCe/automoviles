import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Servicio } from '../../../../../../../../interface/automovil/registros-automovil/servicio.interface';

export const ServicioForm: FormGroup = new FormGroup({
  PLACAS: new FormControl('', Validators.required),
  FECHA: new FormControl('', Validators.required),
  DESCRIPCION: new FormControl('', Validators.required),
  KILOMETRAJE: new FormControl('', Validators.required),
  ESTATUS: new FormControl(1),
} as {
  [K in keyof Servicio]: FormControl;
});
