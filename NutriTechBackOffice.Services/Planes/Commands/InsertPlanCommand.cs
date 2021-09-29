using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Planes.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Planes.Commands
{
    public class InsertPlanCommand: IRequest<PlanAlimentacion>
    {
        public InsertPlanForm Plan { get; set; }

        public InsertPlanCommand(InsertPlanForm plan)
        {
            Plan = plan;
        }
    }
}
