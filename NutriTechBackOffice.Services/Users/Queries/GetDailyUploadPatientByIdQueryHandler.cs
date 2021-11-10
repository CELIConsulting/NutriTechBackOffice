using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Helpers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Queries
{
    class GetDailyUploadPatientByIdQueryHandler : IRequestHandler<GetDailyUploadPatientByIdQuery, List<FoodUploadRegistry>>
    {
        private CollectionReference patientsRef;
        private QuerySnapshot existingPatientDailyUpload;
        private CollectionReference collectionReference;
        private List<FoodUploadRegistry> DailyUploads;
        private const string DAILYUPLOAD = "DailyUpload";
        private const string BUCKETNAME = "nutritechistea-d3f24.appspot.com";
        private StorageClient storageClient;

        public GetDailyUploadPatientByIdQueryHandler(FirestoreDb firestore, StorageClient storage )
        {
            patientsRef = firestore.Collection("Users");
            storageClient = storage;
        }

        public async Task<List<FoodUploadRegistry>> Handle(GetDailyUploadPatientByIdQuery request, CancellationToken cancellationToken)
        {
            Task<QuerySnapshot> task = patientsRef.Document(request.Email.ToString()).Collection(DAILYUPLOAD).GetSnapshotAsync();
            existingPatientDailyUpload = await task;
            DailyUploads = new List<FoodUploadRegistry>();
            if (existingPatientDailyUpload.Count != 0)
            {
                foreach (DocumentSnapshot item in existingPatientDailyUpload)
                {
                    FoodUploadRegistry dailyUploadRegistry = item.ConvertTo<FoodUploadRegistry>();

                    using (MemoryStream stream = new MemoryStream())
                    {
                        storageClient.DownloadObject(BUCKETNAME, $"users/{request.Email}/foodUpload/{dailyUploadRegistry.imageName}", stream);
                        dailyUploadRegistry.urlImage = $"data:image/jpeg;base64,{Convert.ToBase64String(stream.ToArray())}";
                    }

                    DailyUploads.Add(dailyUploadRegistry);
                }

                return DailyUploads;
            }
            return DailyUploads;
        }
    }
}
