using AutoMapper;
using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        private const string BUCKETNAME = "nutritechistea-d3f24.appspot.com";
        private StorageClient storageClient;


        public DeleteUserCommandHandler(FirestoreDb firestore, FirebaseAuth firebaseAuth, StorageClient storage)
        {
            _userRef = firestore.Collection("Users");
            storageClient = storage;
            _firebaseAuth = firebaseAuth;

        }

        private static async Task DeleteCollection(CollectionReference collectionReference, int batchSize)
        {
            QuerySnapshot snapshot = await collectionReference.Limit(batchSize).GetSnapshotAsync();
            IReadOnlyList<DocumentSnapshot> documents = snapshot.Documents;
            while (documents.Count > 0)
            {
                foreach (DocumentSnapshot document in documents)
                {
                    Debug.WriteLine("Deleting document {0}", document.Id);
                    await document.Reference.DeleteAsync();
                }
                snapshot = await collectionReference.Limit(batchSize).GetSnapshotAsync();
                documents = snapshot.Documents;
            }
            Debug.WriteLine("Finished deleting all documents from the collection.");
        }

        public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _user = await _userRef.Document(request.Email).GetSnapshotAsync();
                if (!_user.Exists)
                {
                    return false;
                }
                UserRecord userRecord = await this._firebaseAuth.GetUserByEmailAsync(request.Email);
                CollectionReference bodyUpload = _userRef.Document(request.Email).Collection("BodyProgress");
                await DeleteCollection(bodyUpload, 5);
                //await this._firebaseAuth.DeleteUserAsync(userRecord.Uid);
                //await _userRef.Document(request.Email).DeleteAsync();
                //storageClient.DeleteObject(BUCKETNAME, $"users/{request.Email}");
                return true;

            }
            catch (Exception e)
            {
                Debug.WriteLine($"errror generado {e}");
                return false;
                throw;
            }
        }
    }
}
