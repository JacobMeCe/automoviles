import { FormControl, FormGroup, Validators } from '@angular/forms';

export const VehicleForm: FormGroup = new FormGroup({
  PLATES: new FormControl('', Validators.required),
  TYPE: new FormControl('', Validators.required),
  BRAND: new FormControl('', Validators.required),
  SUB_BRAND: new FormControl('', Validators.required),
  SERIAL_NUMBER: new FormControl('', Validators.required),
  COLOR: new FormControl('', Validators.required),
  DEPARTMENT: new FormControl('', Validators.required),
  IMAGE: new FormControl('', Validators.required),
});
