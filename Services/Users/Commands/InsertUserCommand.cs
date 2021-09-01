using Domain.Entities;
using MediatR;
using Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Users.Commands
{
    public class InsertUserCommand : IRequest<User>
    {
        public InsertUserForm Usuario { get; }

        public InsertUserCommand(InsertUserForm user)
        {
            Usuario = user;
        }

    }
}
