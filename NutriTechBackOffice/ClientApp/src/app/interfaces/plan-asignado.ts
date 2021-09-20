import { PlanAlimentacion } from "./plan-alimentacion";
import { LastUpdated } from "./user";

export interface PlanAsignado {
  planAlimentacion: string;
  notasAdicionales: string;
  lastAsignacion: LastUpdated;
}
