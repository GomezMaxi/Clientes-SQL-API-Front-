import { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../services/api";
import { guardarClientesLS, cargarClientesLS } from "../services/localStorage";
import { Link } from "wouter";
import { toast } from "sonner";
import "./Home.css";
import Swal from "sweetalert2";

function Home() {
  //Declaro los estados
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  //Cargo clientes al iniciar
  useEffect(() => {
    const clientesLS = cargarClientesLS();
    //Busco clientes en el localstorage para usar, sino llamo a la API y guardo esos
    if (clientesLS && clientesLS.length) {
      setClientes(clientesLS);
    } else {
      getClientes()
        .then((res) => {
          setClientes(res.data);
          guardarClientesLS(res.data);
        })
        .catch(() => {
          toast.error("Error al cargar clientes desde la API");
        });
    }
  }, []);

  //Filtro para buscar clientes y actualizar la lista
  useEffect(() => {
    const resultado = clientes.filter((c) => {
      const texto = `${c.dni} ${c.nombre} ${c.apellido}`.toLowerCase();
      return texto.includes(filtro.toLowerCase());
    });
    setClientesFiltrados(resultado);
  }, [filtro, clientes]);

  //Funcion para eliminar un cliente
  const handleDelete = async (id) => {
    //Alerta para eliminar cliente
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCliente(id);
          const actualizados = clientes.filter((c) => c.id !== id);
          setClientes(actualizados);
          guardarClientesLS(actualizados);
          Swal.fire(
            "¡Eliminado!",
            "El cliente fue eliminado correctamente.",
            "success"
          );
        } catch {
          Swal.fire("Error", "Hubo un error al eliminar el cliente.", "error");
        }
      }
    });
  };

  return (
    <div className="home-container">
      <h1 className="home-titulo">Listado de Clientes</h1>

      {/*Buscador*/}
      <input
        type="text"
        className="home-buscador"
        placeholder="Buscar por DNI, nombre o apellido..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {/*Boton para agregar cliente*/}
      <Link href="/crear" className="boton-crear">+ Nuevo Cliente</Link> 

      {clientesFiltrados.length === 0 ? (
        <p>No se encontraron clientes</p>
      ) : (
        <>
          {/* Tarjetas con botones para cada cliente */}
          <div className="clientes-tarjetas">
            {clientesFiltrados.map((c) => (
              <div className="cliente-card" key={c.id}>
                <h3>{c.apellido}, {c.nombre}</h3>
                <p>DNI: {c.dni}</p>
                <div className="cliente-acciones">
                  <Link href={`/detalle/${c.id}`}><button className="btn-detalle">Ver</button></Link>
                  <Link href={`/editar/${c.id}`}><button className="btn-editar">Editar</button></Link>
                  <button className="btn-eliminar" onClick={() => handleDelete(c.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          {/* Lo mismo de arriba pero con tablas para pantallas mas grandes */}
          <table className="clientes-tabla">
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((c) => (
                <tr key={c.id}>
                  <td>{c.dni}</td>
                  <td>{c.apellido}, {c.nombre}</td>
                  <td>
                    <div className="cliente-acciones">
                      <Link href={`/detalle/${c.id}`}><button className="btn-detalle">Ver</button></Link>
                      <Link href={`/editar/${c.id}`}><button className="btn-editar">Editar</button></Link>
                      <button className="btn-eliminar" onClick={() => handleDelete(c.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Home;
