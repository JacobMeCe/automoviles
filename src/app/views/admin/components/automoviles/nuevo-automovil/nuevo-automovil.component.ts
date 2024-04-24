import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';
import { AutomovilForm } from './form/automovil.form';
import { FirebaseService } from '../../../../../../services/firebase.service';
import { FormGroup } from '@angular/forms';
import { Departmento } from '../../../../../../utils/enum/departmento.enum';
import { TipoAutomovil } from '../../../../../../utils/enum/tipo-automovil.enum';

@Component({
  selector: 'app-nuevo-automovil',
  templateUrl: './nuevo-automovil.component.html',
  styleUrls: ['./nuevo-automovil.component.scss'],
})
export class NuevoAutomovilComponent {
  private fileSelected: File;
  protected automovilForm: FormGroup<any>;
  protected tiposAutomovil: string[];
  protected departmentos: string[];

  constructor(
    private api: GeneralService,
    private alerts: SweetAlertService,
    private router: Router,
    private store: FirebaseService,
    private renderer: Renderer2,
  ) {
    this.automovilForm = AutomovilForm;
    this.departmentos = Object.values(Departmento);
    this.tiposAutomovil = Object.values(TipoAutomovil);
  }

  ngOnInit(): void {
    // Change all inputs to uppercase
    this.automovilForm.valueChanges.subscribe((value) => {
      for (const field in value) {
        if (typeof value[field] === 'string' && field !== 'IMAGEN') {
          const control = this.automovilForm.get(field);
          if (control) {
            control.setValue(value[field].toUpperCase(), { emitEvent: false });
          }
        }
      }
    });
  }

  /**
   * Función para enviar formulario
   */
  postForm(): void {
    console.log(this.automovilForm.value);

    if (this.automovilForm.invalid) {
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

        this.automovilForm.patchValue({
          IMAGEN: await this.store.uploadImage(
            this.fileSelected,
            this.automovilForm.value.PLACAS,
          ),
        });

        console.log(this.automovilForm.value);

        this.api.nuevoAutomovil(this.automovilForm.value).subscribe(() => {
          this.alerts
            .realizado('Completado', 'Se ha enviado la solicitud con exito')
            .then((res: any) => {
              if (res.isConfirmed) {
                this.router.navigate([
                  'admin/lista-automoviles-nuevo-automovil/',
                ]);
              }
            })
            .catch((e) => {
              this.alerts.alertaError('Ups', 'Error de solicitud');
              console.log(e);
            });
        });

        this.automovilForm.reset();
      });
  }

  /**
   * Función para seleccionar archivo
   */
  onFileSelected(event: any): void {
    const image = this.renderer.selectRootElement('#imagePreview');
    const file: File = event.target.files[0];
    this.previewImage(file, image);
  }

  /**
   * Función para cambiar el título del dropzone al arrastrar sobre él
   */
  onDragOver(event: any): void {
    event.preventDefault();
    this.changeDropTitle('Suelte la imagen');
  }

  /**
   * Función para cambiar el título del dropzone al salir de él
   */
  onDragLeave(event: any): void {
    event.preventDefault();
    if (this.fileSelected) {
      this.changeDropTitle(this.fileSelected.name);
      return;
    }
    this.changeDropTitle(
      'Arrastre y suelte una imagen o haga clic para seleccionar un archivo',
    );
  }

  /**
   * Función para prevenir el comportamiento por defecto al soltar un archivo
   */
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
   * Función para previsualizar imagen
   */
  previewImage(file: File, imgElement: any): void {
    this.fileSelected = file;

    if (file) {
      this.automovilForm.patchValue({
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
   * Función para limpiar imagen
   */
  clearImage(): void {
    const image = this.renderer.selectRootElement('#imagePreview');
    this.renderer.setAttribute(image, 'src', '');
    this.changeDropTitle(
      'Arrastre y suelte una imagen o haga clic para seleccionar un archivo',
    );
  }

  /**
   * Función para cambiar el título del dropzone
   */
  changeDropTitle(title: string): void {
    const contentTitle = this.renderer.selectRootElement('#dropTitle');
    this.renderer.setProperty(contentTitle, 'textContent', title);
  }

  /**
   * Función para navegar a la lista de automoviles
   */
  navigateToList(): void {
    this.router.navigate(['admin/automoviles/lista']);
  }
}
