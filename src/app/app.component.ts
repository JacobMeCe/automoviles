import { Component, HostListener  } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(){

  }

  /*@HostListener('window:beforeunload', ['$event'])
beforeunloadHandler(event:any) {
    localStorage.clear();
    this.api.logueado = false;
}*/
ngOnInit(): void {

}




}

