using NutriTechBackOffice.Domain.Entities;
using MediatR;
using NutriTechBackOffice.Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class UpdateUserCommand : IRequest<User>
    {
        public UpdateUserForm Usuario { get; }
        public UpdateUserCommand(UpdateUserForm user)
        {
            Usuario = user;
        }
    }
}
