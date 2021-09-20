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
    public class UpdatePatientCommandHandler : IRequestHandler<UpdatePatientCommand, Paciente>
    {
        private CollectionReference patientsRef;
        private WriteResult result;
        public UpdatePatientCommandHandler(FirestoreDb firestore)
        {
            patientsRef = firestore.Collection("Users");
        }

        public async Task<Paciente> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
        {
            var userWithMail = await patientsRef.Document(request.Email).GetSnapshotAsync();

            if (userWithMail.Exists)
            {
                #region Get existing user
                Dictionary<string, object> user = userWithMail.ToDictionary();
                string json = JsonConvert.SerializeObject(user);
                Paciente existingUser = JsonConvert.DeserializeObject<Paciente>(json);
                #endregion

                if (existingUser.Email.Equals(request.Email))
                {
                    try
                    {

                        //TODO: Cambiar por automapper
                        #region Crear paciente en base al form

                        Paciente pacienteActualizado = new Paciente()
                        {
                            Nombre = request.Paciente.Nombre,
                            Apellido = request.Paciente.Apellido,
                            Email = request.Paciente.Email,
                            Password = request.Paciente.Password,
                            Rol = request.Paciente.Rol,
                            Telefono = request.Paciente.Telefono,
                            FechaNacimiento = request.Paciente.FechaNacimiento,
                            Altura = request.Paciente.Altura,
                            Peso = request.Paciente.Peso,
                            MedidaCintura = request.Paciente.MedidaCintura,
                            TipoAlimentacion = request.Paciente.TipoAlimentacion,
                            PlanAsignado = request.Paciente.PlanAsignado
                        };
                        #endregion

                        #region Actualizar usuario en firestore
                        string jsonPaciente = JsonConvert.SerializeObject(pacienteActualizado);
                        var firestorePaciente = JsonConvert.DeserializeObject<ExpandoObject>(jsonPaciente);
                        result = await this.patientsRef.Document(request.Paciente.Email).UpdateAsync(firestorePaciente);
                        #endregion

                        if (result != null)
                        {
                            return pacienteActualizado;
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
    }
}
