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

        // GET api/<PlanController>/nombre
        [HttpGet("{nombre}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> GetPlansAsync(string nombre)
        {
            return Ok(await _mediator.Send(new GetPlanByIdQuery(nombre)));

        }

        // PUT api/<PlanController>/nombre
        [HttpPut("{nombre}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> PutAsync(string nombre, [FromBody] InsertPlanForm planForm) =>
            Ok(await _mediator.Send(new UpdatePlanCommand(nombre, planForm)));

        // DELETE api/<PlanController>/nombre
        [HttpDelete("{nombre}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> Delete(string nombre)
        {
            var result = await _mediator.Send(new DeletePlanCommand(nombre));
            if (result == false)
                return BadRequest();
            else
                return Ok();
        }
    }
}
