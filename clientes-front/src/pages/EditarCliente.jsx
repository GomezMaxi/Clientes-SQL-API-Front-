import { useEffect, useState } from "react";
import ClienteForm from "../components/ClienteForm";
import { getCliente, updateCliente } from "../services/api";
import { guardarClientesLS, cargarClientesLS } from "../services/localStorage";
import { useLocation, useParams } from "wouter";
import { toast } from "sonner"; //notificaciones
import "./EditarCliente.css"; 
import Swal from "sweetalert2";

function EditarCliente() {
  //Obtengo los parametros y la ubicacion
  const [, setLocation] = useLocation();
  const params = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    getCliente(params.id).then(res => setCliente(res.data));
  }, [params.id]);

  //Actualizo
  const handleUpdate = async (data) => {
    const clienteConId = { ...data, id: parseInt(params.id, 10) };

    //Transformo el telefono vacio en null para evitar errores de validacion
    if (clienteConId.telefono === "") {
      clienteConId.telefono = null;
    }

    try {
      const res = await updateCliente(params.id, clienteConId); // Llamo a la API
      //Actualizo el localstorage y redirige despues de actualizar
      let clientesLS = cargarClientesLS() || [];
      clientesLS = clientesLS.map(c => (c.id === clienteConId.id ? res.data || clienteConId : c));
      guardarClientesLS(clientesLS);

      //Alerta  de que el cliente fue guardado
      Swal.fire({
        title: "Cliente actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        didOpen: () => {
          const modal = Swal.getPopup();
          if (modal) {
            modal.setAttribute("draggable", "true");
          }
        },
      }).then(() => {
        setLocation("/");
      });
    } catch {
      toast.error("Error al actualizar cliente");
    }
  };

  if (!cliente) return <p className="cargando">Cargando...</p>; //mensaje si no se carga el cliente

  //Devuelvo el formulario
  return (
    <div className="editar-cliente-container">
      <h2 className="editar-titulo">Editar Cliente</h2>
      <ClienteForm
        onSubmit={handleUpdate}
        defaultValues={cliente}
        esEdicion={true}
      />
    </div>
  );
}

export default EditarCliente;
