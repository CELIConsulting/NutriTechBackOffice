using Google.Cloud.Firestore;
using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Planes.Forms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Planes.Commands
{
    public class InsertPlanCommandHandler : IRequestHandler<InsertPlanCommand, PlanAlimentacion>
    {
        private CollectionReference _planesRef;
        private WriteResult _result;

        public InsertPlanCommandHandler(FirestoreDb firestore)
        {
            //Conectarme con la base de datos de firestore
            _planesRef = firestore.Collection("Planes");
        }

        public async Task<PlanAlimentacion> Handle(InsertPlanCommand request, CancellationToken cancellationToken)
        {
            //Generar el objeto de Plan de Alimentacion en base al request y guardarlo
            try
            {
                PlanAlimentacion plan = new PlanAlimentacion
                {
                    Id = null,
                    Nombre = request.Plan.Nombre,
                    Tipo = request.Plan.Tipo,
                    CantAguaDiaria = request.Plan.CantAguaDiaria,
                    CantColacionesDiarias = request.Plan.CantColacionesDiarias,
                    Desayuno = request.Plan.Desayuno,
                    Almuerzo = request.Plan.Almuerzo,
                    Merienda = request.Plan.Merienda,
                    Cena = request.Plan.Cena,
                    Colacion = request.Plan.Colacion
                };

                _result = await _planesRef.Document(request.Plan.Nombre).SetAsync(plan);

                if(_result == null)
                {
                    return null;
                }

                return plan;
            }
            catch
            {

                throw;
            }

        }
    }
}
