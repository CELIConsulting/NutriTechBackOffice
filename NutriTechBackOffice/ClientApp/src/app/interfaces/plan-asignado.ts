import { PlanAlimentacion } from "./plan-alimentacion";
import { LastUpdated } from "./user";

export interface PlanAsignado {
  planAlimentacion: PlanAlimentacion;
  notasAdicionales: string;
  lastAsignacion: LastUpdated;
}
