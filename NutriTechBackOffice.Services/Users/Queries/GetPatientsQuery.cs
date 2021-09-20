using MediatR;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetPatientsQuery: IRequest<List<User>>
    {
        public GetPatientsQuery()
        {

        }
    }
}
