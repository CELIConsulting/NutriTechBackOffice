import { PlanAsignado } from "./plan-asignado";
import { Role } from "./role";

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Role;
  planAsignado: PlanAsignado;
  lastUpdated: LastUpdated;
}
export interface LastUpdated {  
}
