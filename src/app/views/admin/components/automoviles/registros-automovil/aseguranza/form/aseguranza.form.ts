import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Aseguranza } from '../../../../../../../../interface/automovil/registros-automovil/aseguranza.interface';

export const AseguranzaForm: FormGroup = new FormGroup({
  PLACAS: new FormControl('', Validators.required),
  FECHA: new FormControl('', Validators.required),
  DESCRIPCION: new FormControl('', Validators.required),
  STATUS: new FormControl(),
} as {
  [K in keyof Aseguranza]: FormControl;
});
