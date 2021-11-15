using Google.Cloud.Firestore;
using System;

namespace NutriTechBackOffice.Domain.Entities
{
    public class GraficValues
    {
        [FirestoreProperty]
        public float? peso { get; set; }
        [FirestoreProperty]
        public DateTimeOffset fechaActualizacion { get; set; }
    }
}
