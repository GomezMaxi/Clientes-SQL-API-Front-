using ClientesAPI.Data;
using Microsoft.EntityFrameworkCore;

// Creo el constructor
var builder = WebApplication.CreateBuilder(args);

// Uso CORS ya que el front y el back estan en distintos dominios
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

//Defino las politicas de CORS para permitir solicitudes desde mi front
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173") // el front
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Registro mis controladores como servicios para que ASP.NET reconozca mis clases en ClientesController
builder.Services.AddControllers();

// Defino SQL como motor
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Swagger para la prueba de endpoints
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Constructor de la app
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
