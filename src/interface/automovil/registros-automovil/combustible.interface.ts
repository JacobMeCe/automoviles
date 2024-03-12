import { TipoCombustible } from '../../../utils/enum/tipo-combustible.enum';
import { Status } from '../../../utils/enum/status.enum';

export interface Combustible {
  ID?: number;
  PLACAS: string;
  FECHA: Date;
  FOLIO: string;
  TIPO_COMBUSTIBLE: TipoCombustible;
  LITROS: number;
  STATUS?: Status;
}
