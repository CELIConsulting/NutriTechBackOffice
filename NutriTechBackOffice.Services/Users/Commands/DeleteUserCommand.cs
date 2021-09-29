using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class DeleteUserCommand : IRequest<bool>
    {
        public string Email { get; set; }

        public DeleteUserCommand(string email)
        {
            Email = email;
        }

    }
}
