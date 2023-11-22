import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls: ['./estatus.component.scss']
})
export class EstatusComponent {
  apellidos='';
  nombre='';
  asunto='';
  direccion='';
  localidad='';
  particular='';
  telefono='';
  responsable='';
  data:any;
  estatus:any
  id:any
    constructor(private api: GeneralService,private router: Router,private activerouter:ActivatedRoute,private alerts: SweetAlertService) { }

    ngOnInit() {
      console.log('entra');

      this.id = this.activerouter.snapshot.paramMap.get('id');
      this.api.solicitudesID(this.id).subscribe((res: any) => {
        this.data = res.body;
        console.log(this.data);

        this.nombre=this.data[0].NOMBRE
        this.apellidos=this.data[0].APELLIDOS
        this.asunto=this.data[0].ASUNTO
        this.direccion=this.data[0].DIRECCION
        this.localidad=this.data[0].LOCALIDAD
        this.particular=this.data[0].PARTICULAR_INSTITUCION
        this.telefono=this.data[0].TELEFONO
        this.responsable=this.data[0].RESPONSABLE
        this.estatus=this.data[0].ESTATUS
      });
    }


   progreso(){
    this.id = this.activerouter.snapshot.paramMap.get('id');
    this.api.estatusSolicitud(1,this.id).subscribe((res: any) => {
      this.estatus = res.body;

      this.alerts.realizado('Completado', 'Se ha cambiado el esatus con exito').then((res: any) => {
        this.router.navigate(['admin/lista-solicitudes'])
      })
   })
  }

  terminada(){
    this.id = this.activerouter.snapshot.paramMap.get('id');
    this.api.estatusSolicitud(2,this.id).subscribe((res: any) => {
      this.estatus = res.body;


      this.alerts.realizado('Completado', 'Se ha cambiado el esatus con exito').then((res: any) => {
        this.router.navigate(['admin/lista-solicitudes'])
      })

   })
  }
  cancelar(){
    this.router.navigate(['admin/lista-solicitudes'])
  }

}
