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
    public class GetPatientsQueryHandler :  IRequestHandler<GetPatientsQuery, List<Paciente>>
    {
        private CollectionReference _usersRef;
        private QuerySnapshot _patientsFound;
        private List<Paciente> _patients;

        public GetPatientsQueryHandler(FirestoreDb firestore)
        {
            _patients = new List<Paciente>();
            _usersRef = firestore.Collection("Users");
        }

        public async Task<List<Paciente>> Handle(GetPatientsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _patientsFound = await _usersRef.WhereEqualTo("Rol.Nombre", "Paciente").GetSnapshotAsync();

                foreach (var document in _patientsFound)
                {
                    if (document.Exists)
                    {
                        Dictionary<string, object> patient = document.ToDictionary();

                        string patientJSON = JsonConvert.SerializeObject(patient);
                        Paciente newPatient = JsonConvert.DeserializeObject<Paciente>(patientJSON);
                        _patients.Add(newPatient);
                    }

                }

                return _patients;

            }
            catch
            {

                throw;
            }
        }
    }
}
