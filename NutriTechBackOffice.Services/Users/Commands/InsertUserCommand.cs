using NutriTechBackOffice.Domain.Entities;
using MediatR;
using NutriTechBackOffice.Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Commands
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
