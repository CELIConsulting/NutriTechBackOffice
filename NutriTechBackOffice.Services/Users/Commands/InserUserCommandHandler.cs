using NutriTechBackOffice.Domain.Entities;
using Google.Cloud.Firestore;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using NutriTechBackOffice.Services.Users.Queries;
using AutoMapper;
using FirebaseAdmin.Auth;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class InserUserCommandHandler : IRequestHandler<InsertUserCommand, User>
    {
        private CollectionReference usersRef;
        private WriteResult result;
        private readonly IMapper _mapper;
        private readonly FirebaseAuth _firebaseAuth;
        public InserUserCommandHandler(FirestoreDb firestore, IMapper mapper, FirebaseAuth firebaseAuth)
        {
            usersRef = firestore.Collection("Users");
            _mapper = mapper;
            _firebaseAuth = firebaseAuth
        }
        public async Task<User> Handle(InsertUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User();
            switch (request.Usuario.Rol)
            {
                case "Paciente":
                    user = _mapper.Map<Paciente>(request.Usuario);
                    break;
                case "Admin":
                    user = _mapper.Map<Administrador>(request.Usuario);
                    break;
                case "Nutricionista":
                    user = _mapper.Map<Nutricionista>(request.Usuario);
                    break;
                default:
                    //user = _mapper.Map<User>(request.Usuario);
                    break;
            }
            result = await this.usersRef.Document(request.Usuario.Email).SetAsync(user);
            UserRecordArgs args = new UserRecordArgs()
            {
                Email = "user@example.com",
                EmailVerified = false,
                PhoneNumber = "+11234567890",
                Password = "secretPassword",
                DisplayName = "John Doe",
                PhotoUrl = "http://www.example.com/12345678/photo.png",
                Disabled = false,
            };

            UserRecord userRecord = await this._firebaseAuth.CreateUserAsync(args);
            if (result == null)
                return null;
            return user;


        }
    }
}
