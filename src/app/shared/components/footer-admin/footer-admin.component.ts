import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.scss']
})
export class FooterAdminComponent implements OnInit {
  token = false;
  bann: any;
  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.token = true;
    } else {
      this.token = false
    }
    this.service.verBanner().subscribe(res => {
      this.bann = res.body[0];

    })
  }

}
