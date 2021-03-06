﻿using System;
using System.Collections.Generic;

namespace CoreVanillaJs.Models
{
    public partial class Entidades
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string CodPostal { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string Pais { get; set; }
        public int Estado { get; set; }
        public int IdGrupo { get; set; }

        public virtual Grupos IdGrupoNavigation { get; set; }
    }
}
