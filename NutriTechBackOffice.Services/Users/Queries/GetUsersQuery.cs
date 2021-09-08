using NutriTechBackOffice.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using NutriTechBackOffice.Domain.Entities;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetUsersQuery : IRequest<List<User>>
    {
    }
}
