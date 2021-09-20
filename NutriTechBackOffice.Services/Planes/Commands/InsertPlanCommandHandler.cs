using Google.Cloud.Firestore;
using MediatR;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Planes.Forms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;

namespace NutriTechBackOffice.Services.Planes.Commands
{
    public class InsertPlanCommandHandler : IRequestHandler<InsertPlanCommand, PlanAlimentacion>
    {
        private CollectionReference _planesRef;
        private WriteResult _result;
        private readonly IMapper _mapper;

        public InsertPlanCommandHandler(FirestoreDb firestore, IMapper mapper)
        {
            //Conectarme con la base de datos de firestore
            _planesRef = firestore.Collection("Planes");
            _mapper = mapper;
        }

        public async Task<PlanAlimentacion> Handle(InsertPlanCommand request, CancellationToken cancellationToken)
        {
            //Generar el objeto de Plan de Alimentacion en base al request y guardarlo
            try
            {
                PlanAlimentacion plan = _mapper.Map<PlanAlimentacion>(request.Plan);

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
