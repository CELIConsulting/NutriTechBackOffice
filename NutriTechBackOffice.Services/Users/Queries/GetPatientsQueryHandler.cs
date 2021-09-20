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
    public class GetPatientsQueryHandler :  IRequestHandler<GetPatientsQuery, List<User>>
    {
        private CollectionReference _usersRef;
        private QuerySnapshot _patientsFound;
        private List<User> _patients;

        public GetPatientsQueryHandler(FirestoreDb firestore)
        {
            _patients = new List<User>();
            _usersRef = firestore.Collection("Users");
        }

        public async Task<List<User>> Handle(GetPatientsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                //Obtener dentro de la collecion de usuarios, aquellos que tengan en Rol.Nombre el paciente
                _patientsFound = await _usersRef.WhereEqualTo("Rol.Nombre", "Paciente").GetSnapshotAsync();

                foreach (var document in _patientsFound)
                {
                    if (document.Exists)
                    {
                        Dictionary<string, object> patient = document.ToDictionary();

                        string patientJSON = JsonConvert.SerializeObject(patient);
                        User newPatient = JsonConvert.DeserializeObject<User>(patientJSON);
                        newPatient.Id = document.Id;
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
