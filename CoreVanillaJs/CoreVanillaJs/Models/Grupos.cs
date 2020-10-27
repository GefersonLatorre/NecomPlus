using System;
using System.Collections.Generic;

namespace CoreVanillaJs.Models
{
    public partial class Grupos
    {
        public Grupos()
        {
            Entidades = new HashSet<Entidades>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Color { get; set; }

        public virtual ICollection<Entidades> Entidades { get; set; }
    }
}
