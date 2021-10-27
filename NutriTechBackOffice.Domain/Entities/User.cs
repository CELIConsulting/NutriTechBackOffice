using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class User
    {
        [FirestoreProperty]
        public string Nombre { get; set; }

        [FirestoreProperty]
        public string Apellido { get; set; }

        [FirestoreProperty]
        public string Email { get; set; }

        [FirestoreProperty]
        public string Password { get; set; }

        [FirestoreProperty]
        public string Rol { get; set; }

        [FirestoreProperty]
        public DateTime? FechaNacimiento { get; set; }

        [FirestoreProperty]
        public string Telefono { get; set; }

        [FirestoreProperty, ServerTimestamp]
        public Timestamp LastUpdated { get; set; }
    }
}
