using MediatR;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Planes.Queries
{
    public class GetPlanByIdQuery: IRequest<PlanAlimentacion>
    {
        private PlanAlimentacion _planAlimentacion;

        //El id es el nombre del plan
        public GetPlanByIdQuery(string id)
        {

        }

    }
}
