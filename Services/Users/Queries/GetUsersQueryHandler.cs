using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Services;

namespace Services.Users.Queries
{
    public class GetUsersQueryHandler : FirestoreHelper, IRequestHandler<GetUsersQuery,List<User>>
    {
        private CollectionReference usersRef;
        private QuerySnapshot existingUsers;
        private List<User> _users= new List<User>();

        public GetUsersQueryHandler()
        {
            usersRef = this.FirestoreDb.Collection("Users");
        }

        public async Task<List<User>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            existingUsers = await usersRef.GetSnapshotAsync();
            foreach (var document in existingUsers)
            {
                Dictionary<string, object> documentDictionary = document.ToDictionary();
                //int id = (int)documentDictionary["id"];
                string nombre = documentDictionary["nombre"].ToString();
                string apellido = documentDictionary["apellido"].ToString();
                string email = documentDictionary["email"].ToString();
                string password = documentDictionary["password"].ToString();
                //Role role = (Role)documentDictionary["Role"];
                Role role = new Role()
                {
                    Nombre = "admin",
                    Descripcion = "super admin"
                };
                User user = new User()
                {
                    //Id = id,
                    Nombre = nombre,
                    Apellido = apellido,
                    Email = email,
                    Password = password,
                    Rol = role
                };
                _users.Add(user);
            }
            return _users;
        }
    }
}
