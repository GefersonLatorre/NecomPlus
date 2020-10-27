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
    public class EntidadesController : ControllerBase
    {
        // GET api/entidades
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.BancariaDBContext db = new Models.BancariaDBContext())
            {
                var lst = (from d in db.Entidades select d).OrderByDescending(d => d.Id).ToList();
                return Ok(lst);
            }
        }

        // POST api/entidades
        [HttpPost]
        public ActionResult Post([FromBody] Models.Request.EntidadesRequest model)
        {
            using (Models.BancariaDBContext db = new Models.BancariaDBContext())
            {
                Models.Entidades oEntidades = new Models.Entidades();
                oEntidades.Nombre = model.Nombre;
                oEntidades.Direccion = model.Direccion;
                oEntidades.CodPostal = model.CodPostal;
                oEntidades.Telefono = model.Telefono;
                oEntidades.Email = model.Email;
                oEntidades.Pais = model.Pais;   
                oEntidades.Estado = model.Estado;
                oEntidades.IdGrupo = model.IdGrupo;
                db.Entidades.Add(oEntidades);
                db.SaveChanges();
            }
            return Ok();
        }

        // PUT api/entidades
        [HttpPut]
        public ActionResult Put([FromBody] Models.Request.EntidadesEditRequest model)
        {
            using (Models.BancariaDBContext db = new Models.BancariaDBContext())
            {
                Models.Entidades oEntidades = db.Entidades.Find(model.Id);
                oEntidades.Nombre = model.Nombre;
                oEntidades.Direccion = model.Direccion;
                oEntidades.CodPostal = model.CodPostal;
                oEntidades.Telefono = model.Telefono;
                oEntidades.Email = model.Email;
                oEntidades.Pais = model.Pais;
                oEntidades.Estado = model.Estado;
                oEntidades.IdGrupo = model.IdGrupo;
                db.Entry(oEntidades).State  =  Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
            }
            return Ok();
        }
        // DELETE api/entidades
        [HttpDelete]
        public ActionResult Delete([FromBody] Models.Request.EntidadesDeleteRequest model)
        {
            using (Models.BancariaDBContext db = new Models.BancariaDBContext())
            {
                Models.Entidades oEntidades = db.Entidades.Find(model.Id);
                db.Entidades.Remove(oEntidades);
                db.SaveChanges();
            }
            return Ok();
        }
    }
}