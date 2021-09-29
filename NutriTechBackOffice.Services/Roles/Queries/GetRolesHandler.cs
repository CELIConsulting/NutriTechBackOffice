using NutriTechBackOffice.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using NutriTechBackOffice.Services;
using Newtonsoft.Json;


namespace NutriTechBackOffice.Services.Roles.Queries
{
    public class GetRolesHandler : IRequestHandler<GetRolesQuery, List<Role>>
    {
        private CollectionReference rolesRef;
        private QuerySnapshot existingRoles;
        private List<Role> _roles = new List<Role>();

        public GetRolesHandler(FirestoreDb firestore)
        {
            rolesRef = firestore.Collection("Roles");
        }

        public async Task<List<Role>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {
            existingRoles = await rolesRef.GetSnapshotAsync();
            foreach (var document in existingRoles)
            {
                if (document.Exists)
                {
                    Dictionary<string, object> user = document.ToDictionary();
                    string json = JsonConvert.SerializeObject(user);
                    Role newUser = JsonConvert.DeserializeObject<Role>(json);
                    _roles.Add(newUser);
                }
            }
            return _roles;
        }
    }
}
