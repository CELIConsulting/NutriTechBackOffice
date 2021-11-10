using System;
using System.Collections.Generic;
using System.Text;
using Google.Cloud.Firestore;

namespace NutriTechBackOffice.Domain.Entities
{


    [FirestoreData]
    public class BodyProgress

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

