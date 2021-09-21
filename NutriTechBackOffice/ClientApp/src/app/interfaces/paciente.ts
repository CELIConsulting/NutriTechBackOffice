import { PlanAsignado } from "./plan-asignado";
import { LastUpdated, User } from "./user";

export interface Paciente extends User {
  altura: number;
  peso: number;
  medidaCintura: number;
  tipoAlimentacion: string;
  planAsignado: PlanAsignado;
  lastAssignment: LastUpdated;
}
