using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Helpers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Queries
{
    class GetDailyUploadPatientByIdQueryHandler : IRequestHandler<GetDailyUploadPatientByIdQuery, List<DailyUploadRegistry>>
    {
        private CollectionReference patientsRef;
        private QuerySnapshot existingPatientDailyUpload;
        private CollectionReference collectionReference;
        private List<DailyUploadRegistry> DailyUploads;
        private const string DAILYUPLOAD = "DailyUpload";
        private StorageClient storageClient;

        public GetDailyUploadPatientByIdQueryHandler(FirestoreDb firestore, StorageClient storage )
        {
            patientsRef = firestore.Collection("Users");
            storageClient = storage;
        }

        public async Task<List<DailyUploadRegistry>> Handle(GetDailyUploadPatientByIdQuery request, CancellationToken cancellationToken)
        {
            Task<QuerySnapshot> task = patientsRef.Document(request.Email.ToString()).Collection(DAILYUPLOAD).GetSnapshotAsync();
            existingPatientDailyUpload = await task;
            DailyUploads = new List<DailyUploadRegistry>();
            if (existingPatientDailyUpload.Count != 0)
            {
                foreach (var item in existingPatientDailyUpload)
                {
                    Dictionary<string, object> userDailyUpload = item.ToDictionary();
                    string json = JsonConvert.SerializeObject(userDailyUpload);
                    DailyUploadRegistry  dailyUploadRegistry = JsonConvert.DeserializeObject<DailyUploadRegistry>(json);
                    Debug.WriteLine("objecto final {0}, nombre de la imagen: {1}", dailyUploadRegistry, dailyUploadRegistry.ImageName);
                    //dailyUploadRegistry.UrlImage = Convert.ToBase64String();
                    DailyUploads.Add(dailyUploadRegistry);
                }
                return DailyUploads;
            }
            return DailyUploads;
        }
    }
}
