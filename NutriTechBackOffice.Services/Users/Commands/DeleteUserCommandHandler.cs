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
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
    {
        private CollectionReference _userRef;
        private IMapper _mapper;
        private DocumentSnapshot _user;

        public DeleteUserCommandHandler(FirestoreDb firestore)
        {
            _userRef = firestore.Collection("Users");
           
        }

        public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            _user = await _userRef.Document(request.Email).GetSnapshotAsync();
            if (_user.Exists)
            {
                await _userRef.Document(request.Email).DeleteAsync();
                return true;

            }
            else {
                return false;
            }
        }
    }
}
