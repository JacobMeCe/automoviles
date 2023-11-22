import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { RespuestaAPI } from 'src/interface/api-responses.model';
import { loginI } from 'src/interface/usuario.model';
import { SweetAlertService } from 'src/services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = false;
tipo:any
  idUsuario: any = "";
  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });

  iniciandoSesion = false;

  constructor(
    private api: AuthService,
    private router: Router,
    private alertas: SweetAlertService
  ) { }

  errorStatus: boolean = false;
  errorMsj: any = '';
  login: any;
user:any
  ngOnInit(): void {
    this.checkLocalStorage();
    if (localStorage.getItem("token")) {
      this.token = true;
    }
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['admin']);
    }
  }

  onLogin(form: any) {
    this.login = true;
    this.iniciandoSesion = true;  //Mostrar spinner loading
this.tipo=this.loginForm.value.usuario
    console.log(this.tipo);


    this.api.user(this.tipo).subscribe(res=>{
      this.user=res.body
      console.log(this.user);

      this.tipo=res.body[0].TIPO
      localStorage.setItem('tipo',this.tipo)
      })



    this.api.loginByUser(form).subscribe(
      (data) => {
        let dataResponse: RespuestaAPI = data;
        if (dataResponse.status == 200) {




          this.iniciandoSesion = false;
          localStorage.setItem('token', dataResponse.body);


          this.api.logueado = true;
          this.router.navigate(['/admin/solicitudes']);

        } else {
          this.iniciandoSesion = false;
          this.errorStatus = true;
          this.errorMsj = 'Datos incorrectos';
          console.log('error');
          this.alertas
            .alertaError('Error', 'Datos incorrectos')
            .then((res) => { });
        }
      },
      (err) => {
        this.iniciandoSesion = false;
        this.login = false;
      }
    );

  }

  cerrar() {
    localStorage.clear()
    location.reload()
  }
}
