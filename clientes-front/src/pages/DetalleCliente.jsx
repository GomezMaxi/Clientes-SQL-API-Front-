import { useEffect, useState } from "react";
import { getCliente } from "../services/api";
import { useParams } from "wouter";
import "./DetalleCliente.css";

function DetalleCliente() {
  const params = useParams();
  const [cliente, setCliente] = useState(null);

  //Obtengo el cliente al llamar el id
  useEffect(() => {
    getCliente(params.id).then(res => setCliente(res.data));
  }, [params.id]);

  if (!cliente) return <p className="cargando">Cargando...</p>; //Mensaje si el cliente no está cargado

  //Muestro detalles del cliente
  return (
    <div className="detalle-container">
      <h2 className="detalle-titulo">Detalle del Cliente</h2>
      <ul className="detalle-lista">
  <li><b>DNI:</b> <span>{cliente.dni}</span></li>
  <li><b>Apellido:</b> <span>{cliente.apellido}</span></li>
  <li><b>Nombre:</b> <span>{cliente.nombre}</span></li>
  <li><b>Dirección:</b> <span>{cliente.direccion}</span></li>
  <li><b>Teléfono:</b> <span>{cliente.telefono || "-"}</span></li>
</ul>

    </div>
  );
}

export default DetalleCliente;
