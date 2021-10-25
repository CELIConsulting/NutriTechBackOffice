using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class RemovePatientInfoCommand: IRequest<User>
    {
        public string Email { get; set; }
        public UpdatePatientForm PatientForm { get; set; }

        public RemovePatientInfoCommand(string email, UpdatePatientForm patientForm)
        {
            Email = email;
            PatientForm = patientForm;
        }

    }
}
