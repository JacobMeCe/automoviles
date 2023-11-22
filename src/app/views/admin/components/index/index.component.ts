import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

declare var svg:any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  data: any;
  bann: any;
  boton: any;
  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.boton = 1;
    }
    this.service.verNoticias().subscribe(res => {
      this.data = res.body;
      console.log(this.data);

    })
    this.service.verBanner().subscribe(res => {
      this.bann = res.body;
      console.log(this.bann);

    })
    svg();
  }

  noticia1() {
    this.router.navigate(['admin/ver-noticia/1'])
  }

  noticia2() {
    this.router.navigate(['admin/ver-noticia/2'])
  }

  noticia3() {
    this.router.navigate(['admin/ver-noticia/3'])
  }
  noticia4() {
    this.router.navigate(['admin/ver-noticia/4'])
  }
  noticia5() {
    this.router.navigate(['admin/ver-noticia/5'])
  }

  noticia6() {
    this.router.navigate(['admin/ver-noticia/6'])
  }

  editar() {
    this.router.navigate(["admin/editar-banner"])
  }

  subirNoticia() {
    this.router.navigate(['admin/subir-noticia']);
  }
}
