using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Planes.Forms
{
    public class InsertPlanForm
    {
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public float CantAguaDiaria { get; set; }
        public float CantColacionesDiarias { get; set; }
        public List<string> Desayuno { get; set; }
        public List<string> Almuerzo { get; set; }
        public List<string> Merienda { get; set; }
        public List<string> Cena { get; set; }
        public List<string> Colacion { get; set; }
    }
}


