using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    [FirestoreData]
    public class Role
    {
        //public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

    }
}
