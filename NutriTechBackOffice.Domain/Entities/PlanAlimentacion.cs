using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class PlanAlimentacion
    {
        [FirestoreProperty]
        public string Nombre { get; set; }

        [FirestoreProperty]
        public string Tipo { get; set; }

        [FirestoreProperty]
        public float CantAguaDiaria { get; set; }

        [FirestoreProperty]
        public float CantColacionesDiarias { get; set; }

        [FirestoreProperty]
        public List<string> Desayuno { get; set; }

        [FirestoreProperty]
        public List<string> Almuerzo { get; set; }

        [FirestoreProperty]
        public List<string> Merienda { get; set; }

        [FirestoreProperty]
        public List<string> Cena { get; set; }

        [FirestoreProperty]
        public List<string> Colacion { get; set; }

        [FirestoreProperty, ServerTimestamp]
        public object LastUpdated { get; set; }
    }
}
