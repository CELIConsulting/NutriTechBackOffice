using System;
using System.Collections.Generic;
using System.Text;
using Google.Cloud.Firestore;

namespace NutriTechBackOffice.Domain.Entities
{
    [FirestoreData]
    public class Paciente : User
    {
        [FirestoreProperty]
        float? Altura { get; set; }

        [FirestoreProperty]
        float? Peso { get; set; }

        [FirestoreProperty]
        float? MedidaCintura { get; set; }

        [FirestoreProperty]
        string? TipoAlimentacion { get; set; }

        [FirestoreProperty]
        PlanAlimentacion? PlanAsignado { get; set; }

    }
}
