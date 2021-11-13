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
    class GetDailyUploadPatientByIdQueryHandler : IRequestHandler<GetDailyUploadPatientByIdQuery, List<FoodUploadRegistry>>
    {
        private CollectionReference patientsRef;
        private QuerySnapshot existingPatientDailyUpload;
        private List<FoodUploadRegistry> DailyUploads;
        private const string DAILYUPLOAD = "DailyUpload";
        private const string BUCKETNAME = "nutritechistea-d3f24.appspot.com";
        private StorageClient storageClient;

        public GetDailyUploadPatientByIdQueryHandler(FirestoreDb firestore, StorageClient storage )
        {
            patientsRef = firestore.Collection("Users");
            storageClient = storage;
            DailyUploads = new List<FoodUploadRegistry>();
        }

        public async Task<List<FoodUploadRegistry>> Handle(GetDailyUploadPatientByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                Task<QuerySnapshot> task = patientsRef.Document(request.Email.ToString()).Collection(DAILYUPLOAD).GetSnapshotAsync();
                existingPatientDailyUpload = await task;
                if (existingPatientDailyUpload.Count != 0)
                {
                    foreach (DocumentSnapshot item in existingPatientDailyUpload)
                    {
                        FoodUploadRegistry dailyUploadRegistry = item.ConvertTo<FoodUploadRegistry>();

                        using (MemoryStream stream = new MemoryStream())
                        {
                            storageClient.DownloadObject(BUCKETNAME, $"users/{request.Email}/foodUpload/{dailyUploadRegistry.imageName}.jpg", stream);
                            dailyUploadRegistry.urlImage = $"data:image/jpeg;base64,{Convert.ToBase64String(stream.ToArray())}";
                        }

                        DailyUploads.Add(dailyUploadRegistry);
                    }

                    return DailyUploads;
                }
                return DailyUploads;
            }
            catch (Exception error)
            {
                Debug.WriteLine(error);
                return DailyUploads;
            }
        }
    }
}
