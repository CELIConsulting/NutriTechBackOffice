export interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: string;
  lastUpdated: LastUpdated;
  fechaNacimiento: Date;
  telefonoContacto: string;
}

export interface LastUpdated {
}
