import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Automovil } from '../../../../../../../interface/automovil/automovil.interface';

export const AutomovilForm: FormGroup = new FormGroup({
  PLACAS: new FormControl('', Validators.required),
  TIPO_AUTOMOVIL: new FormControl('', Validators.required),
  MARCA: new FormControl('', Validators.required),
  MODELO: new FormControl('', Validators.required),
  NUMERO_SERIE: new FormControl('', Validators.required),
  COLOR: new FormControl('', Validators.required),
  DEPARTAMENTO: new FormControl('', Validators.required),
  IMAGEN: new FormControl(),
  STATUS: new FormControl(),
} as {
  [K in keyof Automovil]: FormControl;
});
