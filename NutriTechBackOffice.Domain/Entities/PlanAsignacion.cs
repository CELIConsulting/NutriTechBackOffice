using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class PlanAsignacion
    {
        [FirestoreProperty]
        public string PlanAlimentacion { get; set; }

        [FirestoreProperty]
        public string NotasAdicionales { get; set; }

        [FirestoreProperty, ServerTimestamp]
        public object LastAssignment { get; set; }

    }
}
