using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetBodyProgressPhotoQuery : IRequest<List<PhotoBodyProgress>>
    {
        public GetBodyProgressPhotoQuery(string email, string proyectId)
        {
            Email = email;
            ProyectId = proyectId;
        }

        public string Email { get; }
        public string ProyectId { get; }
    }
}
