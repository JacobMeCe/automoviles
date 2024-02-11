import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';
import { VehicleForm } from '../../../../../interface/solicitudes/vehicleForm.interface';
import { FirebaseService } from '../../../../../services/firebase.service';
import departments from '../../../../../utils/departments.json';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent {
  departments = departments;
  fileSelected: File;
  newVehicleForm: FormGroup = new FormGroup({
    PLATES: new FormControl('', Validators.required),
    TYPE: new FormControl('', Validators.required),
    BRAND: new FormControl('', Validators.required),
    SUB_BRAND: new FormControl('', Validators.required),
    SERIAL_NUMBER: new FormControl('', Validators.required),
    COLOR: new FormControl('', Validators.required),
    DEPARTMENT: new FormControl('', Validators.required),
    IMAGE: new FormControl('', Validators.required),
  });

  constructor(
    private api: GeneralService,
    private alerts: SweetAlertService,
    private router: Router,
    private store: FirebaseService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    // Change all inputs to uppercase
    this.newVehicleForm.valueChanges.subscribe((value) => {
      for (const field in value) {
        if (typeof value[field] === 'string' && field !== 'DEPARTMENT') {
          const control = this.newVehicleForm.get(field);
          if (control) {
            control.setValue(value[field].toUpperCase(), { emitEvent: false });
          }
        }
      }
    });
  }

  /**
   * Function to post form
   * @description This function send the form to the API
   * and show a confirmation alert
   * @param form
   */
  postForm(form: VehicleForm): void {
    if (this.newVehicleForm.invalid) {
      this.alerts.alertaError(
        'Error de solicitud',
        'Todos los campos son obligatorios',
      );
      return;
    }

    this.alerts
      .alertaConfirmacionAgregar(
        'Registro de datos',
        '¿Desea enviar los datos de su registro?',
      )
      .then(async (res: any) => {
        if (!res.isConfirmed) return;

        form.IMAGE = await this.store.uploadImage(
          this.fileSelected,
          form.PLATES,
        );

        console.log(form);

        /*

        this.api.newVehicle(form).subscribe(() => {
          this.alerts
            .realizado('Completado', 'Se ha enviado la solicitud con exito')
            .then((res: any) => {
              if (res.isConfirmed) {
                this.router.navigate(['admin/lista-solicitudes/']);
              }
            })
            .catch((e) => {
              this.alerts.alertaError('Ups', 'Error de solicitud');
              console.log(e);
            });
        });

         */
      });
  }

  /**
   * Function to view details
   * @description This function redirect to the details page
   */
  viewRegistersList(): void {
    this.router.navigate(['admin/lista-solicitudes/']);
  }

  /**
   * Function to get image
   * @description This function get the image from the input
   * @param event
   */
  onFileSelected(event: any): void {
    const image = this.renderer.selectRootElement('#imagePreview');
    const file: File = event.target.files[0];
    this.previewImage(file, image);
  }

  onDragOver(event: any): void {
    event.preventDefault();
    this.changeDropTitle('Suelte la imagen');
  }

  onDragLeave(event: any): void {
    event.preventDefault();
    if (this.fileSelected) {
      this.changeDropTitle(this.fileSelected.name);
      return;
    }
    this.changeDropTitle('Arrastre o suelte una imagen');
  }

  onDrop(event: any): void {
    event.preventDefault();
    const files: File[] = event.dataTransfer.files;
    if (files.length > 1) {
      this.alerts.alertaError(
        'Error de imagen',
        'Solo puede seleccionar una imagen',
      );
      this.clearImage();
      this.changeDropTitle(
        'Arrastre y suelte una imagen o haga clic para seleccionar un archivo',
      );
      return;
    }

    const imageFile: File = files[0];

    if (imageFile.type.includes('image')) {
      const image = this.renderer.selectRootElement('#imagePreview');
      this.previewImage(imageFile, image);
    } else {
      this.alerts.alertaError(
        'Error de imagen',
        'El archivo seleccionado no es una imagen',
      );
      this.clearImage();
      this.changeDropTitle(
        'Arrastre y suelte una imagen o haga clic para seleccionar un archivo',
      );
    }
  }

  /**
   * Function to preview image
   * @param file
   * @param imgElement
   */
  previewImage(file: File, imgElement: any): void {
    this.fileSelected = file;

    if (file) {
      this.newVehicleForm.patchValue({
        IMAGE: file.name,
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.renderer.setAttribute(imgElement, 'src', e.target.result);
      };

      reader.readAsDataURL(file);
      this.changeDropTitle(file.name);
    } else {
      this.clearImage();
    }
  }

  /**
   * Function to remove image from preview
   */
  clearImage(): void {
    const image = this.renderer.selectRootElement('#imagePreview');
    this.renderer.setAttribute(image, 'src', '');
    this.changeDropTitle(
      'Arrastre y suelte una imagen o haga clic para seleccionar un archivo',
    );
  }

  /**
   * Function to change title
   * @param title
   */
  changeDropTitle(title: string): void {
    const contentTitle = this.renderer.selectRootElement('#dropTitle');
    this.renderer.setProperty(contentTitle, 'textContent', title);
  }
}
