using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Users.Commands;
using Services.Users.Forms;
using Services.Users.Queries;

namespace NutriTechBackOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public readonly IMediator _mediator;
        public HomeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetUsers() =>
        //    Ok(await _mediator.Send(new GetUsersQuery()));
    }
}
