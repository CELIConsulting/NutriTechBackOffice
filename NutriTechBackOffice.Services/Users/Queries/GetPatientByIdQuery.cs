using MediatR;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetPatientByIdQuery : IRequest<Paciente>
    {
        public string Email { get;}

        public GetPatientByIdQuery(string email)
        {
            Email = email;
        }

    }
}
