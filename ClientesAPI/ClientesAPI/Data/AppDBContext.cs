using ClientesAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ClientesAPI.Data
{
    public class AppDbContext : DbContext
    {
        //Le paso la configuracion de la cadena de conexion mediante options al constructor
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }
        
        //Represento la tabla Cliente
        public DbSet<Cliente> Clientes => Set<Cliente>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           //Especifico que DNI tiene que ser unico
            modelBuilder.Entity<Cliente>()
                .HasIndex(c => c.Dni)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
