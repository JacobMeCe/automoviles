import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';
import { VehicleForm } from '../../../../../interface/solicitudes/vehicleForm.interface';
import { FirebaseService } from '../../../../../services/firebase.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent {
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

  ngOnInit(): void {}

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

        const imagePath: string[] = await this.store.uploadImage(
          this.fileSelected,
          form.PLATES,
        );

        form.IMAGE = imagePath[0];

        this.api.nuevoAutomivil(form).subscribe(() => {
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
    this.changeDropTitle('Arrastre o suelte una imagen');
  }

  onDrop(event: any): void {
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    if (file) {
      const image = this.renderer.selectRootElement('#imagePreview');
      console.log(file);
      this.previewImage(file, image);
    } else {
      this.alerts.alertaError(
        'Error de imagen',
        'El archivo seleccionado no es una imagen',
      );
      this.clearImage();
      this.changeDropTitle('Arrastre o suelte una imagen');
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
      //this.hideDropTitle();
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
    this.showDropTitle();
    this.changeDropTitle('Arrastre o suelte una imagen');
  }

  /**
   * Function to change title
   * @param title
   */
  changeDropTitle(title: string): void {
    const contentTitle = this.renderer.selectRootElement('#dropTitle');
    this.renderer.setProperty(contentTitle, 'textContent', title);
  }

  /**
   * Function to hide title
   */
  hideDropTitle(): void {
    const contentTitle = this.renderer.selectRootElement('#dropTitle');
    if (contentTitle) {
      contentTitle.style.display = 'none';
    }
  }

  /**
   * Function to show title
   */
  showDropTitle(): void {
    const contentTitle = this.renderer.selectRootElement('#dropTitle');
    this.renderer.setStyle(contentTitle, 'display', 'block');
  }
}
