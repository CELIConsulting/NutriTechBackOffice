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
        public PlanAlimentacion PlanAlimentacion { get; set; }

        [FirestoreProperty]
        public string NotasAdicionales { get; set; }

        [FirestoreProperty, ServerTimestamp]
        public Timestamp LastAssignment { get; set; }

    }
}
