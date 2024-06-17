import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Automovil } from '../../../../../../../interface/automovil/automovil.interface';

export const AutomovilForm: FormGroup = new FormGroup({
  PLACAS: new FormControl('', Validators.required),
  TIPO_VEHICULO: new FormControl('', Validators.required),
  NUMERO_ECONOMICO: new FormControl('', Validators.required),
  MODELO: new FormControl('', Validators.required),
  MARCA: new FormControl('', Validators.required),
  SUBMARCA: new FormControl('', Validators.required),
  NUMERO_SERIE: new FormControl('', Validators.required),
  COLOR: new FormControl('', Validators.required),
  DEPARTAMENTO: new FormControl('', Validators.required),
  IMAGEN: new FormControl(),
  ESTATUS: new FormControl(),
} as {
  [K in keyof Automovil]: FormControl;
});
