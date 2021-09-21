using Google.Cloud.Firestore;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NutriTechBackOffice.Services.Roles.Commands;
using NutriTechBackOffice.Services.Roles.Forms;
using NutriTechBackOffice.Services.Roles.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        public readonly IMediator _mediator;
        public RoleController(IMediator mediator)
        {
            _mediator = mediator;
        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<IActionResult> GetRoles() =>
            Ok(await _mediator.Send(new GetRolesQuery()));

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(string id) =>
            Ok(await _mediator.Send(new GetRoleByIdQuery(id)));

        //// POST api/<RoleController>
        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        //public async Task<IActionResult> PostAsync([FromBody] InsertRoleForm roleForm) =>
        //    Ok(await _mediator.Send(new InsertRoleCommand(roleForm)));

        //// PUT api/<RoleController>/5
        //[HttpPut("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        //public async Task<IActionResult> Put(int id, [FromBody] UpdateRoleForm roleForm) =>
        //    Ok(await _mediator.Send(new UpdateRoleCommand(roleForm)));

        //// DELETE api/<RoleController>/5
        //[HttpDelete("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        //public void Delete(int id) =>
        //    Ok();
    }
}
