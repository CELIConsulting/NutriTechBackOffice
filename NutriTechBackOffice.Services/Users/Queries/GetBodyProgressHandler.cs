using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Helpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetBodyProgressHandler: IRequestHandler<GetBodyProgressQuery,List<GraficValues> >
    {
        private CollectionReference patientsRef;
        private QuerySnapshot existingPatient;

        public GetBodyProgressHandler(FirestoreDb firestore)
        {
            patientsRef = firestore.Collection("Users");
        }
        public async Task<List<GraficValues>> Handle(GetBodyProgressQuery request, CancellationToken cancellationToken)
        {
            existingPatient = await patientsRef.Document(request.Email.ToString()).Collection("BodyProgress").GetSnapshotAsync();
            if (existingPatient.Count != 0)
            {
                List<GraficValues> listGraficValues = new List<GraficValues>();
                List<PhotoBodyProgress> listPhoto = new List<PhotoBodyProgress>();
                foreach (var item in existingPatient)
                {
                    BodyProgress bodyProgress = item.ConvertTo<BodyProgress>();
                    GraficValues graficValues = new GraficValues();
                    PhotoBodyProgress photoBodyProgress = new PhotoBodyProgress();
                    graficValues.peso = bodyProgress.peso;
                    graficValues.fechaActualizacion = bodyProgress.lastAssignment;
                    photoBodyProgress.imageName = bodyProgress.imageName;
                    photoBodyProgress.urlImage = bodyProgress.urlImage;

                    listGraficValues.Add(graficValues);
                    listPhoto.Add(photoBodyProgress);
                }
                return listGraficValues;
            }
            return new List<GraficValues>();
        }

    }
}
