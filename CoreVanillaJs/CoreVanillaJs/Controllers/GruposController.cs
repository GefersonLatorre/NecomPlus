using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoreVanillaJs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("permitir")]
    public class GruposController : ControllerBase
    {
        // GET api/grupos
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.BancariaDBContext db = new Models.BancariaDBContext())
            {
                var lst = (from d in db.Grupos select d).ToList();
                return Ok(lst);
            }
        }
    }
}