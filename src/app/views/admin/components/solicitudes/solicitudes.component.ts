import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent {
  boton: any;
  id: any;
  data: any;
  areas: any;
  area: any;
  subarea: any;
  areas1: any;
  menu: any;
  titulo: any;
  icono: any;
  documentoForm: any;

  nuevoPC = new FormGroup({
    PLACAS: new FormControl('', Validators.required),
    TIPO: new FormControl('', Validators.required),
    MARCA: new FormControl('', Validators.required),
    SUBMARCA: new FormControl('', Validators.required),
    SERIAL: new FormControl('', Validators.required),
    COLOR: new FormControl('', Validators.required),
    OFICINA: new FormControl('', Validators.required),
    IMAGEN: new FormControl('', Validators.required),
  });

    //Variables para url de archivos
    urlDocumento = '';

    //Variables para indicar carga de archivos
    subiendoDocumento = false;
  
    archivos: string[] = [];

  constructor(
    private api: GeneralService,
    private alerts: SweetAlertService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  postForm(form: any) {
    this.alerts
      .alertaConfirmacionAgregar(
        'Registro de datos',
        '¿Desea enviar los datos de su registro?'
      )
      .then((res: any) => {
        if (res.isConfirmed) {
          if (
            form.PLACAS !== '' &&
            form.TIPO !== '' &&
            form.MARCA !== '' &&
            form.SUBMARCA !== '' &&
            form.SERIAL !== '' &&
            form.COLOR !== '' &&
            form.IMAGEN !== ''
          ) {
            console.log(form);

            this.api.nuevoAutomivil(form).subscribe(
              (data) => {
                console.log(data);
                this.alerts
                  .realizado(
                    'Completado',
                    'Se ha enviado el solicitud con exito'
                  )
                  .then((res: any) => {});
              },
              (error) => {
                this.alerts.alertaError('Ups', 'Error de solicitud');
              }
            );
          } else {
            this.alerts.alertaError(
              'Error de solicitud',
              'Todos los campos son obligatorios'
            );
          }
        }
      });
  }

  verDetalles() {
    this.router.navigate(['admin/lista-solicitudes/']);
  }

  //* Promesa para obtener una clave de identificacion de documentos para subirlos a Firebase/
  getIdentificadorDocumentos = new Promise((resolve, reject) => {
    this.api.obtenerIdentificadorDocumentos(1).subscribe(res => {
      resolve(res.body);  //Cuando se reciben los datos del servidor, resolvemos la promesa
    })
  })

  async changeFileMenu(event: any, index: any) {

    let file = event.target.files[index];


    //TODO: Obtenemos nombre identificador para el documento
    this.getIdentificadorDocumentos.then(res => {
      let identificador = res;
      this.subiendoDocumento = true; //Indicamos que se comienza proceso subir foto
      //TODO: Subimos archivo a Firebase

      const name = '- Autlan';

      let path = 'Transparencia';  //Construimos ruta
      let fileRef = ref(this.storage, path + '/' + identificador + this.archivos[index]); //Creamos una referncia al archivo usando la ruta

      //Subimos el archivo a Firebase
      uploadBytes(fileRef, file).then(response => {
        //TODO: Descargamos la URL del archivo
        getDownloadURL(fileRef).then(file => {
          this.urlDocumento = file; //guardamos la url del archivo en una variable
          this.subiendoDocumento = false;
          console.log(file);

          this.documentoForm.value.ENLACE = file;
          console.log(this.documentoForm.value.ENLACE);
          this.documentoForm.value.NOMBRE = this.archivos[index]
          console.log(this.documentoForm.value.NOMBRE);

        }).catch(error => { console.log(error) });

      })
    })

  }



}
