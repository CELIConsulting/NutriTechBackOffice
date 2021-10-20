using AutoMapper;
using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Users.Commands
{
    public class RemovePatientInfoCommandHandler : IRequestHandler<RemovePatientInfoCommand, User>
    {
        private CollectionReference _usersRef;
        private WriteResult result;
        private IMapper _mapper;

        public RemovePatientInfoCommandHandler(FirestoreDb firestore, IMapper mapper)
        {
            _usersRef = firestore.Collection("Users");
            _mapper = mapper;
        }

        public async Task<User> Handle(RemovePatientInfoCommand request, CancellationToken cancellationToken)
        {
            var patientWithMail = await _usersRef.Document(request.Email).GetSnapshotAsync();

            if (patientWithMail.Exists)
            {
                if (GetExistingUser(patientWithMail).Email.Equals(request.Email))
                {
                    try
                    {
                        Paciente pacienteAConvertir = _mapper.Map<Paciente>(request.PatientForm);

                        result = await UpdateUserInFirestoreDB(pacienteAConvertir);

                        if (result != null)
                        {
                            return (User)pacienteAConvertir;
                        }

                    }

                    catch (Exception)
                    {
                        throw;
                    }
                }
            }

            return null;
        }

        private Paciente GetExistingUser(DocumentSnapshot userWithMail)
        {
            Dictionary<string, object> user = userWithMail.ToDictionary();
            string json = JsonConvert.SerializeObject(user);
            return JsonConvert.DeserializeObject<Paciente>(json);
        }

        private async Task<WriteResult> UpdateUserInFirestoreDB(Paciente paciente)
        {
            //string jsonPatient = JsonConvert.SerializeObject(paciente);
            //var firestorePatient = JsonConvert.DeserializeObject<ExpandoObject>(jsonPatient);

            //Eliminar campos del documento del paciente
            #region Fields to update
            var fieldsToUpdate = new Dictionary<string, object>();
            fieldsToUpdate.Add("Nombre", paciente.Nombre);
            fieldsToUpdate.Add("Apellido", paciente.Apellido);
            fieldsToUpdate.Add("Email", paciente.Email);
            fieldsToUpdate.Add("Password", paciente.Password);
            fieldsToUpdate.Add("Rol", paciente.Rol);
            fieldsToUpdate.Add("FechaNacimiento", paciente.FechaNacimiento);
            fieldsToUpdate.Add("Telefono", paciente.Telefono);
            fieldsToUpdate.Add("Altura", FieldValue.Delete);
            fieldsToUpdate.Add("Peso", FieldValue.Delete);
            fieldsToUpdate.Add("MedidaCintura", FieldValue.Delete);
            fieldsToUpdate.Add("TipoAlimentacion", FieldValue.Delete);
            fieldsToUpdate.Add("PlanAsignado", FieldValue.Delete);
            #endregion

            //Actualizar documento eliminando los campos del paciente
            return await this._usersRef.Document(paciente.Email).UpdateAsync(fieldsToUpdate);
        }
    }
}



//public string Nombre { get; set; }
//public string Apellido { get; set; }
//public string Email { get; set; }
//public string Password { get; set; }
//public string Rol { get; set; }
//public Timestamp? FechaNacimiento { get; set; }
//public string Telefono { get; set; }
//public Timestamp LastUpdated { get; set; }
//public float? Altura { get; set; }
//public float? Peso { get; set; }
//public float? MedidaCintura { get; set; }
//public string TipoAlimentacion { get; set; }
//public PlanAsignacion PlanAsignado { get; set; }