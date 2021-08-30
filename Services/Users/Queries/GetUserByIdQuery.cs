using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Users.Queries
{
    public class GetUserByIdQuery : IRequest<User>
    {
        public string Id { get; }

        public GetUserByIdQuery(string id)
        {
            Id = id;
        }
    }
}
