using AutoMapper;
using FirebaseAdmin.Auth;
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
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
    {
        private CollectionReference _userRef;
        private IMapper _mapper;
        private DocumentSnapshot _user;
        private readonly FirebaseAuth _firebaseAuth;


        public DeleteUserCommandHandler(FirestoreDb firestore, FirebaseAuth firebaseAuth)
        {
            _userRef = firestore.Collection("Users");
            _firebaseAuth = firebaseAuth;

        }

        public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _user = await _userRef.Document(request.Email).GetSnapshotAsync();
                if (_user.Exists)
                {
                    UserRecord userRecord = await this._firebaseAuth.GetUserByEmailAsync(request.Email);
                    await this._firebaseAuth.DeleteUserAsync(userRecord.Uid);
                    await _userRef.Document(request.Email).DeleteAsync();
                    return true;

                }
                else
                {
                    return false;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
