using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class FirestoreHelper
    {
        public FirestoreDb FirestoreDb { get; set; }
        public FirestoreHelper()
        {
            this.FirestoreDb = FirestoreDb.Create("nutritech-9fc4b");
        }
    }
}
