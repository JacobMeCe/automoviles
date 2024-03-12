import { Status } from '../../../utils/enum/status.enum';

export interface Servicio {
  ID?: number;
  PLACAS: string;
  FECHA: Date;
  DESCRIPCION: string;
  KILOMETRAJE: number;
  STATUS?: Status;
}
