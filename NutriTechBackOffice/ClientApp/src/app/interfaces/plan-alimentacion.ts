import { LastUpdated } from "./user";

export interface PlanAlimentacion {
  nombre: string;
  tipo: string;
  cantAguaDiaria: Number;
  cantColacionesDiarias: Number;
  desayuno: Array<string>;
  almuerzo: Array<string>;
  merienda: Array<string>;
  cena: Array<string>;
  colacion: Array<string>;
  lastUpdated: LastUpdated
}
