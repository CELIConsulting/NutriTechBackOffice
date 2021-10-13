using AutoMapper;
using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, User>
    {
        private CollectionReference _usersRef;
        private WriteResult result;
        private IMapper _mapper;

        public UpdateUserCommandHandler(FirestoreDb firestore, IMapper mapper)
        {
            _usersRef = firestore.Collection("Users");
            _mapper = mapper;
        }

        public async Task<User> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var userWithMail = await _usersRef.Document(request.Email).GetSnapshotAsync();

            if (userWithMail.Exists)
            {
                if (GetExistingUser(userWithMail).Email.Equals(request.Email))
                {
                    try
                    {
                        User usuarioActualizado = _mapper.Map<User>(request.UserForm);
                        result = await UpdateUserInFirestoreDB(usuarioActualizado);

                        if (result != null)
                        {
                            return usuarioActualizado;
                        }

                    }

                    catch (Exception)
                    {
                        throw;
                    }
                }
            }

            return null;
        }

        private User GetExistingUser(DocumentSnapshot userWithMail) {
            Dictionary<string, object> user = userWithMail.ToDictionary();
            string json = JsonConvert.SerializeObject(user);
            return JsonConvert.DeserializeObject<Paciente>(json);
        }

        private async Task<WriteResult> UpdateUserInFirestoreDB(User usuario) 
        {
            string jsonUsuarios = JsonConvert.SerializeObject(usuario);
            var firestoreUsuarios = JsonConvert.DeserializeObject<ExpandoObject>(jsonUsuarios);
            return await this._usersRef.Document(usuario.Email).UpdateAsync(firestoreUsuarios);
        }
    }
}
