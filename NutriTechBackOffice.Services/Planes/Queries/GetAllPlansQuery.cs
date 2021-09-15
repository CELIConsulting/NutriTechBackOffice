using MediatR;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Planes.Queries
{
    public class GetAllPlansQuery: IRequest<List<PlanAlimentacion>>
    {
        
    }
}
