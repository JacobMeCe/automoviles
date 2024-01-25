import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss'],
})
export class ActualizarComponent {
  documentoForm = new FormGroup({
    ID: new FormControl(''),
    LOGO: new FormControl(''),
    DATO1: new FormControl(''),
    DATO2: new FormControl(''),
    TWITTER: new FormControl(''),
    FACEBOOK: new FormControl(''),
    YOUTUBE: new FormControl(''),
  });

  //Variables para url de archivos
  urlDocumento = '';

  //Variables para indicar carga de archivos
  subiendoDocumento = false;

  data: any;

  constructor(
    private api: GeneralService,
    private alerts: SweetAlertService,
    private storage: Storage,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.api.verBanner().subscribe((res) => {
      console.log(res.body);
      this.data = res.body;
    });
  }

  /**
   * Método para obtener el identificador de los documentos
   * @returns Promise con el identificador de los documentos
   */
  getIdentificadorDocumentos = new Promise((resolve, reject) => {
    this.api.obtenerIdentificadorDocumentos(1).subscribe((res) => {
      resolve(res.body);
    });
  });

  /**
   * Método para subir un archivo a Firebase
   * @param event
   */
  async changeFileMenu(event: any) {
    const file = event.target.files[0];

    //TODO: Obtenemos nombre identificador para el documento
    this.getIdentificadorDocumentos.then((res) => {
      const identificador = res;
      this.subiendoDocumento = true; //Indicamos que se comienza proceso subir foto
      //TODO: Subimos archivo a Firebase

      const name = '- Autlan';

      const path = 'Noticias'; //Construimos ruta
      const fileRef = ref(
        this.storage,
        path + '/' + identificador + name + file,
      ); //Creamos una referncia al archivo usando la ruta

      //Subimos el archivo a Firebase
      uploadBytes(fileRef, file).then((response) => {
        //TODO: Descargamos la URL del archivo
        getDownloadURL(fileRef)
          .then((file) => {
            this.urlDocumento = file; //guardamos la url del archivo en una variable
            this.subiendoDocumento = false;
            console.log(file);

            this.documentoForm.value.LOGO = file;
            console.log(this.documentoForm.value.LOGO);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  cargar() {
    this.documentoForm.value.ID = '1';

    if (this.documentoForm.value.ID !== '') {
      console.log(this.documentoForm.value);
      this.api.actualizarBanner(this.documentoForm.value).subscribe((res) => {
        console.log('imagen subida');
        this.alerts.alertaRealizadoAsistencia(
          'Completado',
          'La imagen se ha cargado con exito',
        );
        this.router.navigate(['admin/indice']);
      });
    } else {
      this.alerts.alertaError('Error', 'Llene los campos necesarios');
    }
  }
}
