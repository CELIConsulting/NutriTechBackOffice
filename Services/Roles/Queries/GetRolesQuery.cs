using NutriTechBackOffice.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using NutriTechBackOffice.Domain.Entities;

namespace NutriTechBackOffice.Services.Roles.Queries
{
    public class GetRolesQuery : IRequest<List<Role>>
    {
    }
}
