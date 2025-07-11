using System.ComponentModel.DataAnnotations;

namespace ClientesAPI.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        //Uso Required para los campos obligatorios y especifico el largo igual que en el SQL]
        //Uso =null! para que el compilador no me tire error, ya que sé que nunca va a ser un campo vacío.

        [Required]
        [StringLength(20)]
        public string Dni { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Apellido { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string Direccion { get; set; } = null!;

        //No uso Required porque acepta NULL, también por eso se usa string?
        [Phone]
        [StringLength(20)]
        public string? Telefono { get; set; }
    }
}
