using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using NutriTechBackOffice.Domain.Entities;

namespace NutriTechBackOffice.Services.Users.Queries
{
  public  class GetBodyProgressQuery : IRequest<List<DataProgressChart>>
    {
        public string Email { get; }

        public GetBodyProgressQuery(string email)
        {
            Email = email;
        }

    }
}
