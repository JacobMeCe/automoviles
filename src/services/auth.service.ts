import { Injectable } from "@angular/core";
import { RespuestaAPI } from "src/interface/api-responses.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { loginI, token } from "src/interface/usuario.model";
import { environment } from 'src/environments/environment';

const API = 'https://api.guarderia.saion.mx'

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor(private http:HttpClient){}

  url:string = API + "/";


  user(user: any) {
    return this.http.get<RespuestaAPI>(API +`/login/tipo/${user}`);
  }

  loginByUser(form:loginI):Observable<RespuestaAPI>{
    let direccion = this.url + "login/autlan"
    return this.http.post<RespuestaAPI>(direccion,form);
  }
  loginAdmin(form:loginI):Observable<RespuestaAPI>{
    let direccion = this.url + "login/user"
    return this.http.post<RespuestaAPI>(direccion,form);
  }

  validar(form:token):Observable<RespuestaAPI>{
    let direccion = this.url + "login/validar"
    return this.http.post<RespuestaAPI>(direccion,form);
  }

  getID(usuario:string){
    let direccion = this.url + "login/"
    return this.http.get<RespuestaAPI>(direccion + `idEmpresa/${usuario}`);

  }

  loginUser(form: loginI): Observable<RespuestaAPI>{
    const direccion = API + `/login/usuario`;
    return this.http.post<RespuestaAPI>(direccion,form);
  }




  logueado = false;
}
