using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    [FirestoreData]
    public class User
    {
        [FirestoreProperty]
        public string Id { get; set; }
        [FirestoreProperty]
        public string Nombre { get; set; }
        [FirestoreProperty]
        public string Apellido { get; set; }
        [FirestoreProperty]
        public string Email { get; set; }
        [FirestoreProperty]
        public string Password { get; set; }
        [FirestoreProperty]
        public Role Rol { get; set; }
    }
}
