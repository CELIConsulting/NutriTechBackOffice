using Domain.Entities;
using MediatR;
using Services.Roles.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Roles.Commands
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
