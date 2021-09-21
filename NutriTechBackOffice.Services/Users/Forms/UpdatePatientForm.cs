using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Forms
{
    public class UpdatePatientForm: InsertUserForm
    {
        public float? Altura { get; set; }
        public float? Peso { get; set; }
        public float? MedidaCintura { get; set; }
        public string TipoAlimentacion { get; set; }
        public PlanAsignacion PlanAsignado { get; set; }
    }
}
