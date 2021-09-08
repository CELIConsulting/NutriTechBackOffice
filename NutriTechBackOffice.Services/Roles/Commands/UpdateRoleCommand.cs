using NutriTechBackOffice.Domain.Entities;
using MediatR;
using NutriTechBackOffice.Services.Roles.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Roles.Commands
{
    public class UpdateRoleCommand : IRequest<Role>
    {
        public UpdateRoleForm Usuario { get; }
        public UpdateRoleCommand(UpdateRoleForm role)
        {
            Usuario = role;
        }
    }
}
