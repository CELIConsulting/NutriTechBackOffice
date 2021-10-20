export interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: string;
  fechaNacimiento?: Date;
  telefono: string;
  lastUpdated: Date;
}
