using NutriTechBackOffice.Domain.Entities;
using Google.Cloud.Firestore;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using NutriTechBackOffice.Services.Users.Queries;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class InserUserCommandHandler : IRequestHandler<InsertUserCommand, User>
    {
        private CollectionReference usersRef;
        private WriteResult result;
        public InserUserCommandHandler(FirestoreDb firestore)
        {
            usersRef = firestore.Collection("Users");
        }
        public async Task<User> Handle(InsertUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                if (request.Usuario.Rol == "Paciente")
                {
                    Paciente user = new Paciente()
                    {
                        Nombre = request.Usuario.Nombre,
                        Apellido = request.Usuario.Apellido,
                        Email = request.Usuario.Email,
                        Password = request.Usuario.Password,
                        Rol = request.Usuario.Rol,
                    };
                    result = await this.usersRef.Document(request.Usuario.Email).SetAsync(user);
                    if (result == null)
                    {
                        return null;
                    }

                    return user;
                }
                else if (request.Usuario.Rol == "Admin")
                {
                    Administrador user = new Administrador()
                    {
                        Nombre = request.Usuario.Nombre,
                        Apellido = request.Usuario.Apellido,
                        Email = request.Usuario.Email,
                        Password = request.Usuario.Password,
                        Rol = request.Usuario.Rol,
                    };
                    result = await this.usersRef.Document(request.Usuario.Email).SetAsync(user);
                    if (result == null)
                    {
                        return null;
                    }

                    return user;
                }
                else {
                    Nutricionista user = new Nutricionista()
                    {
                        Nombre = request.Usuario.Nombre,
                        Apellido = request.Usuario.Apellido,
                        Email = request.Usuario.Email,
                        Password = request.Usuario.Password,
                        Rol = request.Usuario.Rol,
                    };
                    result = await this.usersRef.Document(request.Usuario.Email).SetAsync(user);
                    if (result == null)
                    {
                        return null;
                    }

                    return user;
                }
                   
            }
            catch
            {
                throw;
            }
        }
    }
}
