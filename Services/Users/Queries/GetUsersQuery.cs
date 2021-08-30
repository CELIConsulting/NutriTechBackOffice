using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;

namespace Services.Users.Queries
{
    public class GetUsersQuery : IRequest<List<User>>
    {
    }
}
