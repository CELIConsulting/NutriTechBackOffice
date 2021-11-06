using AutoMapper;
using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Users.Helpers;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class UpdatePatientCommandHandler : IRequestHandler<UpdatePatientCommand, Paciente>
    {
        private CollectionReference _patientsRef;
        private WriteResult result;
        private IMapper _mapper;

        public UpdatePatientCommandHandler(FirestoreDb firestore, IMapper mapper)
        {
            _patientsRef = firestore.Collection("Users");
            _mapper = mapper;
        }

        public async Task<Paciente> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
        {
            var userWithMail = await _patientsRef.Document(request.Email).GetSnapshotAsync();

            if (userWithMail.Exists)
            {
                try
                {
                    if (GetExistingUser(userWithMail).Email.Equals(request.Email))
                    {
                        Paciente pacienteActualizado = _mapper.Map<Paciente>(request.Paciente);
                        result = await UpdateUserInFirestoreDB(pacienteActualizado);

                        if (result != null)
                        {
                            return pacienteActualizado;
                        }

                    }
                }
                catch (Exception e)
                {
                    throw;
                }
            }

            return null;
        }

        private Paciente GetExistingUser(DocumentSnapshot userWithMail)
        {
            Dictionary<string, object> user = SerializedUserHelper.GetUser(userWithMail);
            string json = JsonConvert.SerializeObject(user);
            return JsonConvert.DeserializeObject<Paciente>(json);
        }

        private async Task<WriteResult> UpdateUserInFirestoreDB(Paciente paciente)
        {
            //string jsonPaciente = JsonConvert.SerializeObject(paciente);
            //var firestorePaciente = JsonConvert.DeserializeObject<ExpandoObject>(jsonPaciente);
            return await this._patientsRef.Document(paciente.Email).SetAsync(paciente, SetOptions.MergeAll);
        }
    }
}
