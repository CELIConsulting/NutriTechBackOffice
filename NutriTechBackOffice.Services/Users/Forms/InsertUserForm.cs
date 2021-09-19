using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Forms
{
    public class InsertUserForm
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Rol { get; set; }
    }
}
