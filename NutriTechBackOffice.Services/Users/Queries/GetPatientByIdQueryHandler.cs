using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Queries
{
    public class GetPatientByIdQueryHandler : IRequestHandler<GetPatientByIdQuery, Paciente>
    {
        private CollectionReference patientsRef;
        private DocumentSnapshot existingPatient;

        public GetPatientByIdQueryHandler(FirestoreDb firestore)
        {
            patientsRef = firestore.Collection("Users");
        }

        public async Task<Paciente> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
        {
            existingPatient = await patientsRef.Document(request.Email.ToString()).GetSnapshotAsync();

            if (existingPatient.Exists)
            {
                Dictionary<string, object> patient = existingPatient.ToDictionary();
                string json = JsonConvert.SerializeObject(patient);
                Paciente newPatient = JsonConvert.DeserializeObject<Paciente>(json);
                return newPatient;
            }
            else
            {
                return new Paciente();
            }

        }
    }
}