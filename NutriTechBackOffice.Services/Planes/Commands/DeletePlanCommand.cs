using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Planes.Commands
{
    public class DeletePlanCommand : IRequest<bool>
    {
        public string Nombre { get; set; }

        public DeletePlanCommand(string nombre)
        {
            Nombre = nombre;
        }
    }
}
