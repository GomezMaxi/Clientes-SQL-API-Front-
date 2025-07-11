CREATE TABLE Clientes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Dni VARCHAR(20) NOT NULL UNIQUE,
    Apellido VARCHAR(100) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Direccion VARCHAR(200) NOT NULL,
    Telefono VARCHAR(20) NULL
);
INSERT INTO Clientes (Dni, Apellido, Nombre, Direccion, Telefono)
VALUES 
('30123456', 'Lopez', 'Jose', 'Av. Callao 123', '1134567890'),
('28999888', 'Pérez', 'Lucía', 'Talcahuano 456', NULL),
('32555111', 'Rodríguez', 'Juan', 'Mitre 789', '1122334455');