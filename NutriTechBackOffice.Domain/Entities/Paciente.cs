using System;
using System.Collections.Generic;
using System.Text;
using Google.Cloud.Firestore;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class Paciente : User
    {
        [FirestoreProperty]
        public float? Altura { get; set; }

        [FirestoreProperty]
        public float? Peso { get; set; }

        [FirestoreProperty]
        public float? MedidaCintura { get; set; }

        [FirestoreProperty]
        public string TipoAlimentacion { get; set; }

        [FirestoreProperty]
        public PlanAsignacion PlanAsignado { get; set; }

    }
}
