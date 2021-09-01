using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Services;
using Newtonsoft.Json;


namespace Services.Users.Queries
{
    public class GetUsersHandler : FirestoreHelper, IRequestHandler<GetUsersQuery, List<User>>
    {
        private CollectionReference usersRef;
        private QuerySnapshot existingUsers;
        private List<User> _users = new List<User>();

        public GetUsersHandler()
        {
            usersRef = this.FirestoreDb.Collection("Users");
        }

        public async Task<List<User>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            existingUsers = await usersRef.GetSnapshotAsync();
            foreach (var document in existingUsers)
            {
                if (document.Exists)
                {
                    Dictionary<string, object> user = document.ToDictionary();
                    string json = JsonConvert.SerializeObject(user);
                    User newUser = JsonConvert.DeserializeObject<User>(json);
                    newUser.Id = document.Id;
                    _users.Add(newUser);
                }
            }
            return _users;
        }
    }
}
