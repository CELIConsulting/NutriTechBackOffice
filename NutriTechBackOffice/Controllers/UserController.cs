using MediatR;
using Microsoft.AspNetCore.Mvc;
using NutriTechBackOffice.Services.Users.Queries;
using NutriTechBackOffice.Services.Users.Forms;
using NutriTechBackOffice.Services.Users.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NutriTechBackOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        public readonly IMediator _mediator;
        public readonly IConfiguration _config;

        public UserController(IMediator mediator, IConfiguration config)
        {
            _mediator = mediator;
            _config = config;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetUsers() =>
            Ok(await _mediator.Send(new GetUsersQuery()));


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(string id) =>
            Ok(await _mediator.Send(new GetUserByIdQuery(id)));

        // POST api/<UserController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> PostAsync([FromBody] InsertUserForm userForm)
        {
            var result = await _mediator.Send(new InsertUserCommand(userForm));
            if (result == null)
                return BadRequest();
            else
                return Ok(result);
        }

        // PUT api/<UserController>/5
        [HttpPut("{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> PutAsync(string email, [FromBody] InsertUserForm userForm) =>
            Ok(await _mediator.Send(new UpdateUserCommand(email, userForm)));


        // PUT api/<UserController>/Patients/id
        [HttpPut("Patients/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> PutAsync(string id, [FromBody] UpdatePatientForm patientForm) =>
            Ok(await _mediator.Send(new UpdatePatientCommand(id, patientForm)));

        //PUT api/<UserController>/Patients/Convert/id
        [HttpPut("Patients/Convert/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> UpdateUserFromPatient(string id, [FromBody] UpdatePatientForm patientForm) =>
            Ok(await _mediator.Send(new RemovePatientInfoCommand(id, patientForm)));


        // GET api/<UserController>/Patients/
        [HttpGet("Patients")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> GetPatients() =>
            Ok(await _mediator.Send(new GetPatientsQuery()));

        //GET api/<UserController>/Patients/1
        [HttpGet("Patients/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> GetPatientById(string email) =>
            Ok(await _mediator.Send(new GetPatientByIdQuery(email)));

        //GET api/<UserController>/Patients/BodyProgress
        [HttpGet("Patients/BodyProgress/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> GetBodyProgressQuery(string email) =>
            Ok(await _mediator.Send(new GetBodyProgressQuery(email)));

        //GET api/<UserController>/Patients/1/DailyUpload
        [HttpGet("Patients/DailyUpload/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> GetDailyUploadPatientById(string email) =>
            Ok(await _mediator.Send(new GetDailyUploadPatientByIdQuery(email,_config["project_id"])));

        //GET api/<UserController>/Patients/1/BodyProgressPhoto
        [HttpGet("Patients/BodyProgressPhoto/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> GetBodyProgressPhoto(string email) =>
            Ok(await _mediator.Send(new GetBodyProgressPhotoQuery(email, _config["project_id"])));




        // DELETE api/<UserController>/5
        [HttpDelete("{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> Delete(string email)
        {
            var result = await _mediator.Send(new DeleteUserCommand(email));
            if (result == false)
                return BadRequest();
            else
                return Ok();
        }
    }
}
