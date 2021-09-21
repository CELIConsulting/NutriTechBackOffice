import { PlanAsignado } from "./plan-asignado";
import { UserForm } from "./user-form";

export interface PacienteForm extends UserForm {
  Altura: number;
  Peso: number;
  MedidaCintura: number;
  TipoAlimentacion: string;
  PlanAsignado: PlanAsignado;
}
