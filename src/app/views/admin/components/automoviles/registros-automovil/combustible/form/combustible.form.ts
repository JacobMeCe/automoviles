import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Combustible } from '../../../../../../../../interface/automovil/registros-automovil/combustible.interface';

export const CombustibleForm: FormGroup = new FormGroup({
  PLACAS: new FormControl('', Validators.required),
  FECHA: new FormControl('', Validators.required),
  FOLIO: new FormControl('', Validators.required),
  TIPO_COMBUSTIBLE: new FormControl('', Validators.required),
  LITROS: new FormControl('', Validators.required),
  STATUS: new FormControl(),
} as {
  [K in keyof Combustible]: FormControl;
});
