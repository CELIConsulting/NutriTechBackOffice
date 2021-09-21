using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.LogIn.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.LogIn.Queries
{
    public class GetCredentialsQuery : IRequest<User>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public GetCredentialsQuery(LoginForm loginForm)
        {
            Email = loginForm.Email;
            Password = loginForm.Password;
        }
    }
}
