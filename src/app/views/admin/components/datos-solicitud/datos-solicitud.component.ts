import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss'],
})
export class DatosSolicitudComponent {
  data: any;
  id: any;
  folio = '';
  nombre = '';
  apellido_pat = '';
  apellido_mat = '';
  fecha_naciemiento = '';
  observaciones = '';
  busqueda: any;
  estado: any;
  estatus: any;

  constructor(
    private api: GeneralService,
    private router: Router,
    private activo: ActivatedRoute,
    private alerta: SweetAlertService
  ) {}

  ngOnInit() {

  }

  actualizarEnCaptura() {
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(1, this.id).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then((res: any) => {
        location.reload();
      });
    });
  }

  actualizarCapturado() {
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(2, this.id).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then((res: any) => {
        location.reload();
      });
    });
  }

  actualizarNoEncontrado() {
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(3, this.id).subscribe((res: any) => {
      this.estatus = res.body;
      this.alerta.realizado('Cambio', 'cambio realizado').then((res: any) => {
        location.reload();
      });
    });
  }

  verVolver() {
    this.router.navigate(['admin/lista-solicitudes']);
  }
}
