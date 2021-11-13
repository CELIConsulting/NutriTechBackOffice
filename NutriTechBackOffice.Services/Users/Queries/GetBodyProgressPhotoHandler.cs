using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using MediatR;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Queries
{
    class GetBodyProgressPhotoHandler : IRequestHandler<GetBodyProgressPhotoQuery, List<PhotoBodyProgress>>
    {
        private CollectionReference patientsRef;
        private QuerySnapshot existiBodyProgresPhotoUpload;
        private List<PhotoBodyProgress> photoProgressUpload;
        private const string BODYPROGRESS = "BodyProgress";
        private const string BUCKETNAME = "nutritechistea-d3f24.appspot.com";
        private StorageClient storageClient;

        public GetBodyProgressPhotoHandler(FirestoreDb firestore, StorageClient storage )
        {
            patientsRef = firestore.Collection("Users");
            storageClient = storage;
            photoProgressUpload = new List<PhotoBodyProgress>();
        }

        public async Task<List<PhotoBodyProgress>> Handle(GetBodyProgressPhotoQuery request, CancellationToken cancellationToken)
        {
            try
            {
                Task<QuerySnapshot> task = patientsRef.Document(request.Email.ToString()).Collection(BODYPROGRESS).GetSnapshotAsync();
                existiBodyProgresPhotoUpload = await task;
                if (existiBodyProgresPhotoUpload.Count != 0)
                {
                    foreach (DocumentSnapshot item in existiBodyProgresPhotoUpload)
                    {
                        PhotoBodyProgress photoProgressUploadRegistry = item.ConvertTo<PhotoBodyProgress>();

                        using (MemoryStream stream = new MemoryStream())
                        {
                            storageClient.DownloadObject(BUCKETNAME, $"users/{request.Email}/bodyUpload/{photoProgressUploadRegistry.imageName}.jpg", stream);
                            photoProgressUploadRegistry.urlImage = $"data:image/jpeg;base64,{Convert.ToBase64String(stream.ToArray())}";
                        }

                        photoProgressUpload.Add(photoProgressUploadRegistry);
                    }

                    return photoProgressUpload;
                }
                return photoProgressUpload;
            }
            catch (Exception error)
            {
                Debug.WriteLine(error);
                return photoProgressUpload;
            }
        }
    }
}
