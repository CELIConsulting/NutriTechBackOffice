using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class Nutricionista : User
    {
        [FirestoreProperty]
        public int? Matricula { get; set; }
    }
}
