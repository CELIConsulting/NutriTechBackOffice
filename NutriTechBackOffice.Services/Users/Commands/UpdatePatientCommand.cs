using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class UpdatePatientCommand : IRequest<Paciente>
    {
        public UpdatePatientForm Paciente { get; }
        public string Email { get; set; }

        public UpdatePatientCommand(string email, UpdatePatientForm paciente)
        {
            Paciente = paciente;
            Email = email;
        }

    }
}
