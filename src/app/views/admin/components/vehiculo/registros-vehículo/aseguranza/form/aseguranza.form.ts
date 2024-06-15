import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Aseguranza } from '../../../../../../../../interface/automovil/registros-automovil/aseguranza.interface';

export const AseguranzaForm: FormGroup = new FormGroup({
  PLACAS: new FormControl('', Validators.required),
  FECHA: new FormControl('', Validators.required),
  DESCRIPCION: new FormControl('', Validators.required),
  ESTATUS: new FormControl(1),
} as {
  [K in keyof Aseguranza]: FormControl;
});
