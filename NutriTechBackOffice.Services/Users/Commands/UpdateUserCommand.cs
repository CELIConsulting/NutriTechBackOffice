using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class UpdateUserCommand : IRequest<User>
    {
        public InsertUserForm UserForm{ get; }
        public string Email { get; set; }

        public UpdateUserCommand(string email, InsertUserForm userForm)
        {
            UserForm = userForm;
            Email = email;
        }

    }
}
