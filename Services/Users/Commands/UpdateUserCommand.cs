using Domain.Entities;
using MediatR;
using Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Users.Commands
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
