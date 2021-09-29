using NutriTechBackOffice.Domain.Entities;
using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Services.Users.Queries;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetUserByIdHandler : IRequestHandler<GetUserByIdQuery, User>
    {
        private CollectionReference usersRef;
        private DocumentSnapshot existingUser;

        public GetUserByIdHandler(FirestoreDb firestore)
        {
            usersRef = firestore.Collection("Users");
        }
        public async Task<User> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            existingUser = await usersRef.Document(request.Id.ToString()).GetSnapshotAsync();
            if (existingUser.Exists)
            {
                Dictionary<string, object> user = existingUser.ToDictionary();
                string json = JsonConvert.SerializeObject(user);
                User newUser = JsonConvert.DeserializeObject<User>(json);
                return newUser;
            }else
            {
                return new User();
            }
        }
    }
}
