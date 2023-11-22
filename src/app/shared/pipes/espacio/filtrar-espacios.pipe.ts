import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarEspacios'
})
export class FiltrarEspaciosPipe implements PipeTransform {

  transform(arreglo: any[], texto: any): any[] {



    return arreglo.filter(item=>{
      return item.DES_NOMBRE.includes(texto)
    });
      }
    }
