using MediatR;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetDailyUploadPatientByIdQuery : IRequest<List<DailyUploadRegistry>>
    {
        public GetDailyUploadPatientByIdQuery(string email)
        {
            Email = email;
        }

        public string Email { get; }
    }
}
