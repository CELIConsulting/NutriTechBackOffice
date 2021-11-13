using Google.Cloud.Firestore;
using System;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class FoodUploadRegistry
    {
        [FirestoreProperty]
        public string imageName { get; set; }
        [FirestoreProperty]
        public string urlImage { get; set; }
        [FirestoreProperty]
        public bool doExcersice { get; set; }
        [FirestoreProperty]
        public string observations { get; set; }
        [FirestoreProperty]
        public DateTimeOffset lastAssignment { get; set; }
        [FirestoreProperty]
        public string food { get; set; }
    }
}
