﻿using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    [FirestoreData]
    public class User
    {
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Rol { get; set; }
    }
}
