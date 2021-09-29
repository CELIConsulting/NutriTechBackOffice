using Google.Cloud.Firestore;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NutriTechBackOffice.Services.Planes.Commands;
using NutriTechBackOffice.Services.Planes.Forms;
using NutriTechBackOffice.Services.Planes.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PlanController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly FirestoreDb _firestore;

        public PlanController(IMediator mediator, FirestoreDb firestore)
        {
            _mediator = mediator;
            _firestore = firestore;
        }

        // POST: api/<PlanController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> PostAsync([FromBody] InsertPlanForm planForm)
        {
            return Ok(await _mediator.Send(new InsertPlanCommand(planForm)));
        }

        // GET: api/<PlanController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> GetAllPlansAsync()
        {
            return Ok(await _mediator.Send(new GetAllPlansQuery()));

        }
    }
}
