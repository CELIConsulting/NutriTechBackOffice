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
    class GetAllPlansQueryHandler : IRequestHandler<GetAllPlansQuery, List<PlanAlimentacion>>
    {
        private CollectionReference _planesRef;
        private QuerySnapshot _existentPlans;
        private List<PlanAlimentacion> _planesDeAlimentacion;


        public GetAllPlansQueryHandler(FirestoreDb firestore)
        {
            _planesDeAlimentacion = new List<PlanAlimentacion>();
            _planesRef = firestore.Collection("Planes");
        }

        public async Task<List<PlanAlimentacion>> Handle(GetAllPlansQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _existentPlans = await _planesRef.GetSnapshotAsync();

                //Convierto documento existente a una entrada de Dictionary para luego serializarlo a JSON y deserializarlo a un objeto PlanAlimentacion
                foreach (var document in _existentPlans)
                {
                    if (document.Exists)
                    {
                        Dictionary<string, object> plan = document.ToDictionary();
                        string json = JsonConvert.SerializeObject(plan);
                        PlanAlimentacion newPlan = JsonConvert.DeserializeObject<PlanAlimentacion>(json);
                        newPlan.Id = document.Id;
                        _planesDeAlimentacion.Add(newPlan);
                    }
                }

                return _planesDeAlimentacion;
            }
            catch
            {
                throw;
            }

        }
    }
}
