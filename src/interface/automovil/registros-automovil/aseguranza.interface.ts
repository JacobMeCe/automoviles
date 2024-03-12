import { Status } from '../../../utils/enum/status.enum';

export interface Aseguranza {
  ID?: number;
  PLACAS: string;
  FECHA: Date;
  DESCRIPCION: string;
  STATUS?: Status;
}
