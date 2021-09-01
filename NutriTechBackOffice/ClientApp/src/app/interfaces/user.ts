import { Role } from "./role";

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Role;
  lastUpdated: LastUpdated;
}
export interface LastUpdated {
}
