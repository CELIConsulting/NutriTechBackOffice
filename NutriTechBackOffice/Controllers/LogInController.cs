using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NutriTechBackOffice.Services.LogIn.Forms;
using NutriTechBackOffice.Services.LogIn.Queries;
using Google.Cloud.Firestore;
using FirebaseAdmin.Auth;
using System.Net;

namespace NutriTechBackOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogInController : ControllerBase
    {
        public readonly IMediator _mediator;
        public readonly FirebaseAuth _firebaseAuth;
        public LogInController(IMediator mediator, FirebaseAuth firebaseAuth)
        {
            _mediator = mediator;
            _firebaseAuth = firebaseAuth;
        }

        // Post: api/<LogInController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Post([FromBody] LoginForm LoginForm)
        {
            var result = await _mediator.Send(new GetCredentialsQuery(loginForm: LoginForm));
            if (result != null)
            {
                var userToken = await _firebaseAuth.CreateCustomTokenAsync(result.Email);
                Response.Headers.Add("Authorization", userToken);
                return Ok();
            }
            else
            {
                return Unauthorized("Bad Credentials!");
            }
        }
    }
}
