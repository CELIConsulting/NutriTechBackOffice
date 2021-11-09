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

namespace NutriTechBackOffice.Services.Planes.Commands
{
    public class UpdatePlanCommandHandler : IRequestHandler<UpdatePlanCommand, PlanAlimentacion>
    {
        private CollectionReference _PlansRef;
        private WriteResult result;
        private IMapper _mapper;

        public UpdatePlanCommandHandler(FirestoreDb firestore, IMapper mapper)
        {
            _PlansRef = firestore.Collection("Planes");
            _mapper = mapper;
        }

        public async Task<PlanAlimentacion> Handle(UpdatePlanCommand request, CancellationToken cancellationToken)
        {
            var PlanWithName = await _PlansRef.Document(request.Nombre).GetSnapshotAsync();

            if (PlanWithName.Exists)
            {
                if (GetExistingPlan(PlanWithName).Nombre.Equals(request.Nombre))
                {
                    try
                    {
                        PlanAlimentacion planActualizado = _mapper.Map<PlanAlimentacion>(request.PlanForm);
                        result = await UpdatePlanInFirestoreDB(planActualizado);

                        if (result != null)
                        {
                            return planActualizado;
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

        private PlanAlimentacion GetExistingPlan(DocumentSnapshot PlanWithName)
        {
            Dictionary<string, object> Plan = PlanWithName.ToDictionary();
            string json = JsonConvert.SerializeObject(Plan);
            return JsonConvert.DeserializeObject<PlanAlimentacion>(json);
        }

        private async Task<WriteResult> UpdatePlanInFirestoreDB(PlanAlimentacion plan)
        {
            return await this._PlansRef.Document(plan.Nombre).SetAsync(plan, SetOptions.MergeAll);
        }
    }
}
