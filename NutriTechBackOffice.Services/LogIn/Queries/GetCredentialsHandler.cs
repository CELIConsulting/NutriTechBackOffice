using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.LogIn.Queries
{
    public class GetCredentialsHandler : IRequestHandler<GetCredentialsQuery, User>
    {
        private CollectionReference usersRef;
        private QuerySnapshot snapshot;

        public GetCredentialsHandler(FirestoreDb firestore)
        {
            usersRef = firestore.Collection("Users");
        }

        public async Task<User> Handle(GetCredentialsQuery request, CancellationToken cancellationToken)
        {
            snapshot = await usersRef.WhereEqualTo("Email", request.Email).WhereEqualTo("Password", request.Password).GetSnapshotAsync();

            if (snapshot.Count == 1)
            {
                Dictionary<string, object> user = snapshot[0].ToDictionary();
                string json = JsonConvert.SerializeObject(user);
                User newUser = JsonConvert.DeserializeObject<User>(json);
                return newUser;
            }

            return null;
        }
    }
}
