using NutriTechBackOffice.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Roles.Queries
{
    public class GetRoleByIdQuery : IRequest<Role>
    {
        public string Id { get; }

        public GetRoleByIdQuery(string id)
        {
            Id = id;
        }
    }
}
