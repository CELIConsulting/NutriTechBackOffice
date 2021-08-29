using Domain.Entities;
using Google.Cloud.Firestore;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Services.Users.Queries;

namespace Services.Users.Commands
{
    public class InserUserCommandHandler : FirestoreHelper,IRequestHandler<InsertUserCommand, User>
    {
        private CollectionReference usersRef;
        private DocumentReference result;


        public InserUserCommandHandler()
        {
            usersRef = this.FirestoreDb.Collection("Users");
        }
        public async Task<User> Handle(InsertUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                User user = new User()
                {
                    Nombre = request.Usuario.Nombre,
                    Apellido = request.Usuario.Apellido,
                    Email = request.Usuario.Email,
                    Password = request.Usuario.Password,
                    Rol = new Role()
                    {
                        Nombre = request.Usuario.Rol.Nombre,
                        Descripcion = request.Usuario.Rol.Descripcion
                    }
                };
                result = await this.usersRef.AddAsync(user);
                if (result == null)
                {
                    return null;
                }

                return user;
            }
            catch
            {
                throw;
            }
        }
    }
}
