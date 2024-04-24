import { TipoAutomovil } from '../../utils/enum/tipo-automovil.enum';
import { Departmento } from '../../utils/enum/departmento.enum';
import { Status } from '../../utils/enum/status.enum';

export interface Automovil {
  [key: string]: any;

  PLACAS: string;
  TIPO_AUTOMOVIL: TipoAutomovil;
  MARCA: string;
  MODELO: string;
  NUMERO_SERIE: string;
  COLOR: string;
  DEPARTAMENTO: Departmento;
  IMAGEN: string;
  STATUS?: Status;
}
