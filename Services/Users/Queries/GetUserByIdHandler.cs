using Domain.Entities;
using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using Services.Users.Queries;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Users.Queries
{
    class GetUserByIdHandler : FirestoreHelper, IRequestHandler<GetUserByIdQuery, User>
    {
        private CollectionReference usersRef;
        private DocumentSnapshot existingUser;
        private User _user = new User();

        public GetUserByIdHandler()
        {
            usersRef = this.FirestoreDb.Collection("Users");
        }
        public async Task<User> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            existingUser = await usersRef.Document(request.Id.ToString()).GetSnapshotAsync();
            //if (!existingUser.Exists)
            //{
            //    return null;
            //}
            Dictionary<string, object> user = existingUser.ToDictionary();
            string json = JsonConvert.SerializeObject(user);
            User newUser = JsonConvert.DeserializeObject<User>(json);
            newUser.Id = existingUser.Exists ? existingUser.Id : null;
            return newUser;
        }
    }
}
