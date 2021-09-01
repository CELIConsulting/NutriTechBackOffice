import { Role } from "./role";

export interface UserForm {
  Nombre: string;
  Apellido: string;
  Email: string;
  Password: string;
  Rol?: Role;
}
