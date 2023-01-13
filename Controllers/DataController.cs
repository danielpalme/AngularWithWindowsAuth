using AngularWithWindowsAuth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularWithWindowsAuth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DataController : ControllerBase
    {
        private readonly ILogger<DataController> logger;

        public DataController(ILogger<DataController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public ActionResult<UserData> GetUserDataAuthenticated()
        {
            var result = new UserData()
            {
                LoginName = this.User.Identity!.Name!
            };

            this.logger.LogDebug("Login name: {LoginName}", result.LoginName);

            return this.Ok(result);
        }
    }
}