import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-sidenav-admin',
  templateUrl: './sidenav-admin.component.html',
  styleUrls: ['./sidenav-admin.component.scss']
})
export class SidenavAdminComponent implements OnInit {
  token = false;
  bann: any;
  dato1: any;
  dato2: any;
  twitter: any;
  facebook: any;
  youtube: any;
  logo: any;
  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.token = true;
    } else {
      this.token = false
    }
    this.service.verBanner().subscribe(res => {
      this.bann = res.body[0];
      this.dato1 = this.bann.DATO1;
      this.dato2 = this.bann.DATO2;
      this.twitter = this.bann.TWITTER;
      this.facebook = this.bann.FACEBOOK;
      this.youtube = this.bann.YOUTUBE;
      this.logo = this.bann.LOGO;

    })
  }

  instituto() {
    localStorage.setItem('im', '1')
  }
  dif() {
    localStorage.setItem('dif', '1')
  }
  cerrar() {
    localStorage.clear()
    location.reload()
  }
  subirDocumento() {
    localStorage.setItem('articulo', '8');
    console.log(localStorage.getItem('articulo'));
    this.router.navigate(['admin/documento']);
  }
  subirDocumento15() {
    localStorage.setItem('articulo', '15');
    console.log(localStorage.getItem('articulo'));
    this.router.navigate(['admin/documento']);
  }
}
