import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatus'
})
export class EstatusPipe implements PipeTransform {

  /*transform(valor: number): any {
    switch (valor) {
      case 1:
        return 'Activo';
      case 0:
        return 'Inactivo';
    }
  }*/

  transform(value:any, arg:any){
    const resultEspacios = [];
    for(const espacios of value){
      if(espacios.title.indexOf(arg) > -1){
          console.log('sip');
      }
    }
  }

}
