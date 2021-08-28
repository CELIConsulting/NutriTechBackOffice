using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public async Task<HelloMessage> Get()
        {
            HelloMessage message = new HelloMessage
            {
                MessageText = "Hello my Dear!",
                UserName = "pepito"
            };
            return message;
        }
    }
    public class HelloMessage
    {
        public string MessageText { get; set; }
        public string UserName { get; set; }
    }
}
