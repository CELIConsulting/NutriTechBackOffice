using Google.Cloud.Firestore;
using MediatR;
using Newtonsoft.Json;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Planes.Queries
{
    public class GetPlanByIdQueryHandler : IRequestHandler<GetPlanByIdQuery, PlanAlimentacion>
    {
        private CollectionReference planesRef;
        private DocumentSnapshot existingPlan;

        public GetPlanByIdQueryHandler(FirestoreDb firestore)
        {
            planesRef = firestore.Collection("Planes");
        }

        public async Task<PlanAlimentacion> Handle(GetPlanByIdQuery request, CancellationToken cancellationToken)
        {
            existingPlan = await planesRef.Document(request.Name.ToString()).GetSnapshotAsync();

            if (existingPlan.Exists)
            {
                Dictionary<string, object> plan = existingPlan.ToDictionary();
                string json = JsonConvert.SerializeObject(plan);
                PlanAlimentacion newPlan = JsonConvert.DeserializeObject<PlanAlimentacion>(json);
                return newPlan;
            }
            else
            {
                return new PlanAlimentacion();
            }
        }
    }
}
