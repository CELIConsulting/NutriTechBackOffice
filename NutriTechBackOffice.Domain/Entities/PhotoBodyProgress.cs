using Google.Cloud.Firestore;
using System;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public  class PhotoBodyProgress
    {
        [FirestoreProperty]
        public string imageName { get; set; }
        [FirestoreProperty]
        public DateTimeOffset lastAssignment { get; set; }
        [FirestoreProperty]
        public float? medidaCintura { get; set; }
        [FirestoreProperty]
        public float? peso { get; set; }
        [FirestoreProperty]
        public string urlImage { get; set; }
    }
}
