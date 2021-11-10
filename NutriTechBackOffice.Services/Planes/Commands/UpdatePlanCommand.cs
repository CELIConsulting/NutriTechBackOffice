using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Planes.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Planes.Commands
{
    public class UpdatePlanCommand : IRequest<PlanAlimentacion>
    {
        public InsertPlanForm PlanForm { get; }
        public string Nombre { get; set; }

        public UpdatePlanCommand(string nombre, InsertPlanForm planForm)
        {
            PlanForm = planForm;
            Nombre = nombre;
        }
    }
}
