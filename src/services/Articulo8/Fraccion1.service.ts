import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RespuestaAPI } from "src/interface/api-responses.model";
import { environment } from 'src/environments/environment';
import { Observable, Subject } from "rxjs";


const API = "https://api.guarderia.saion.mx";

@Injectable({
  providedIn: 'root'
})

export class Fraccion1Service{

  constructor(private http:HttpClient){}

  //---Observable para indicar URL de foto obtenida---
  urlFoto: any;
  private subject = new Subject<any>();
  url: string = API + "/";


  obtenerA82018(id: any, inciso: any, ano:any, carpeta:any) {
    return this.http.get<RespuestaAPI>(API +`/autlan/docs/A8/${id}/${inciso}/${ano}/${carpeta}`);
  }
  obtenerA8MES(id: any, inciso: any, ano:any, mes:any) {
    return this.http.get<RespuestaAPI>(API +`/autlan/docs/${id}/${inciso}/${ano}/${mes}`);
  }

  obtenerA8Carpeta(id: any, inciso: any, carpeta:any) {
    return this.http.get<RespuestaAPI>(API +`/autlan/docs/A8/${id}/${inciso}/${carpeta}`);
  }
  obtenerA8año(id: any, inciso: any, ano:any) {
    return this.http.get<RespuestaAPI>(API +`/autlan/doc/A8/ano/${id}/${inciso}/${ano}`);
  }
  obtenerAreas(id:any, inciso:any, ano:any, area:any){
    return this.http.get<RespuestaAPI>(API +`/autlan/areas/${id}/${inciso}/${ano}/${area}`);
  }
  obtenerarpetaMes(id: any, inciso: any, ano:any, mes:any, carpeta:any) {
    return this.http.get<RespuestaAPI>(API +`/autlan/bienes/${id}/${inciso}/${ano}/${mes}/${carpeta}`);
  }

  obtenertrimestres(id: any, inciso: any, ano:any, area:any, carpeta:any) {
    return this.http.get<RespuestaAPI>(API +`/autlan/docs/A86L/${id}/${inciso}/${ano}/${area}/${carpeta}`);
  }
  obtenerNoticia(id: any) {
    return this.http.get<RespuestaAPI>(API +`/autlan/obtenerNoticia/${id}`);
  }

}
