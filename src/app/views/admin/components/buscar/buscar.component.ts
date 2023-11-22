import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent {

  documento: any;
  token: any;

  @ViewChild('cbCampo') cbCampo: ElementRef;
  @ViewChild('ctCadena') ctCadena: ElementRef;

  constructor(private api: GeneralService, private router: Router) { }

  ngOnInit() {

  }

  buscar(): void {
    let columName: string = this.cbCampo.nativeElement.value;
    let value: any = this.ctCadena.nativeElement.value;

    if (value.length) {
      console.log('entra buscar');
      this.api.buscar(columName, value).subscribe((res: any) => {
        this.documento = res.body;
        console.log('entra buscar');

      });
    } else {
      this.api.verEnlaces().subscribe(res =>{
        this.documento=res.body
        console.log(this.documento);
        console.log('vacio');

       })
    }
  }
}
