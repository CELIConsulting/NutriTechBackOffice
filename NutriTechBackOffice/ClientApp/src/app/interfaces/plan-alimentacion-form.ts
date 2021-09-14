export interface PlanAlimentacionForm {
  Nombre: string;
  Tipo: string;
  CantAguaDiaria: Number;
  CantColacionesDiarias: Number;
  Desayuno: Array<string>;
  Almuerzo: Array<string>;
  Merienda: Array<string>;
  Cena: Array<string>;
  Colacion: Array<string>;
}

//LastUpdated: que se genere del lado del servidor
