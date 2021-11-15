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
    public class GetBodyProgressHandler: IRequestHandler<GetBodyProgressQuery, List<DataProgressChart>>
    {
        private CollectionReference patientsRef;
        private QuerySnapshot existingPatient;

        public GetBodyProgressHandler(FirestoreDb firestore)
        {
            patientsRef = firestore.Collection("Users");
        }
        public async Task<List<DataProgressChart>>Handle(GetBodyProgressQuery request, CancellationToken cancellationToken)
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

                List<Series> listaSeries = new List<Series>();
                DataProgressChart datosGrafico = new DataProgressChart();
                List<DataProgressChart> listaDatos = new List<DataProgressChart>();
                foreach (var item in listGraficValues)
                {
                    Series serie = new Series();
                    serie.name = item.fechaActualizacion.Date.ToString();
                    serie.value = item.peso;
                    listaSeries.Add(serie);

                }
                datosGrafico.name = "Progreso Peso";
                datosGrafico.series = listaSeries;
                listaDatos.Add(datosGrafico);
                return listaDatos;
            }
            return new List<DataProgressChart>();
        }

    }
}
