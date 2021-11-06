using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class DailyUploadRegistry
    {
        [FirestoreProperty]
        public string ImageName { get; set; }
        [FirestoreProperty]
        public string UrlImage { get; set; }
        [FirestoreProperty]
        public string DoExcersice { get; set; }
        [FirestoreProperty]
        public string Observations { get; set; }
        [FirestoreProperty, ServerTimestamp]
        public Timestamp LastAssignment { get; set; }
    }
}
