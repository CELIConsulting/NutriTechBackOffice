using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Users.Queries;
using Services.Users.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Services.Users.Commands;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NutriTechBackOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetUsers() =>
            Ok(await _mediator.Send(new GetUsersQuery()));

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id) =>
            Ok(await _mediator.Send(new GetUserByIdQuery(id)));

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] InsertUserForm userForm) =>
            Ok(await _mediator.Send(new InsertUserCommand(userForm)));

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
