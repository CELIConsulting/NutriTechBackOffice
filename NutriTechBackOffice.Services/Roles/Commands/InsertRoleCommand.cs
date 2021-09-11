using NutriTechBackOffice.Domain.Entities;
using MediatR;
using NutriTechBackOffice.Services.Roles.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Roles.Commands
{
    public class InsertRoleCommand : IRequest<Role>
    {
        public InsertRoleForm Role { get; }

        public InsertRoleCommand(InsertRoleForm role)
        {
            Role = role;
        }

    }
}
