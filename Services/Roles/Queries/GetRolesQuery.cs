using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;

namespace Services.Roles.Queries
{
    public class GetRolesQuery : IRequest<List<Role>>
    {
    }
}
