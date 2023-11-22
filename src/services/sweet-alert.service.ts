import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  alertaConfirmacionEliminar(titulo: string, contenido: string):Promise<any> {
    return Swal.fire({
      title: titulo,
      text: contenido,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
  }
  alertaError(titulo: string, contenido: string):Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: titulo,
      text: contenido
    })
  }

  alertaErrorVersion(titulo: string, contenido: string): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: titulo,
      text: contenido,
      backdrop: true,
      allowOutsideClick: false,
      confirmButtonColor: "#0a93e2",

    });
  }

  realizado(titulo: string, contenido: string):Promise<any> {
    return Swal.fire({
      icon: 'success',
      title: titulo,
      text: contenido
    })
  }
  alertaEstacionarse(title: string, contenido: any){
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      text: contenido,
      showConfirmButton: true,
      backdrop: false,
      allowOutsideClick: false
    });
  }
  alertaConfirmacion(titulo: string, contenido: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: contenido,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      backdrop: false,
      allowOutsideClick: false
    });
  }


  alertaRealizado(){
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se guardaron los cambios',
      showConfirmButton: true,
      timer: 1500
    })
  }
  alertaErrorPago(titulo: string, contenido: string, ): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: titulo,
      text: contenido,
      backdrop: false,
      allowOutsideClick: false,
      confirmButtonColor: "#0a93e2",
    });
  }

  alertaRealizadoAsistencia(title: any, contenido:any){
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      text:contenido,
      showConfirmButton: true,
      timer: 1500
    })
  }

  alertaAsistencia(title: any, contenido:any){
    return Swal.fire({
      position: 'center',
      icon: 'info',
      title: title,
      text:contenido,
      showConfirmButton: true,
      allowOutsideClick: false
    })
  }


  alertaConfirmacionEditar(titulo: string, contenido: string):Promise<any> {
    return Swal.fire({
      title: titulo,
      text: contenido,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    })
  }

  alertaConfirmacionAgregar(titulo: string, contenido: string):Promise<any> {
    return Swal.fire({
      title: titulo,
      text: contenido,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar'
    })
  }

  msjEnviado(){
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Mensaje enviado',
      showConfirmButton: true,
      timer: 1500
    });
  }
}
