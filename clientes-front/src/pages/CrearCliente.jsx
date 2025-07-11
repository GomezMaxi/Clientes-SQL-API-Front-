import ClienteForm from "../components/ClienteForm";
import { createCliente } from "../services/api";
import { guardarClientesLS, cargarClientesLS } from "../services/localStorage";
import { toast } from "sonner";
import "./CrearCliente.css"; 
import Swal from "sweetalert2";

function CrearCliente() {
  //Creo la funcion para cuando el usuario envía el formulario
  const handleCreate = async (data) => {
    try {
      if (data.telefono === "") { //Si el telefono está vacio lo vuelve null, así evito errores de validacion
        data.telefono = null;
      }

      const res = await createCliente(data);

      //Cargo los clientes del localstorage, agrego el nuevo cliente y guardo
      const clientesLS = cargarClientesLS() || [];
      guardarClientesLS([...clientesLS, res.data]);
      toast.success("Cliente creado correctamente");

      //Alerta de que el cliente fue creado
      Swal.fire({
        title: "Cliente creado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        window.location.href = "/"; //Redirigo despues del guardado
      });
    } catch {
      toast.error("Error al crear cliente");
    }
  };

  return (
    <div className="crear-container">
      <h2 className="crear-titulo">Nuevo Cliente</h2>
      <ClienteForm onSubmit={handleCreate} defaultValues={{}} esEdicion={false} />
    </div>
  );
}

export default CrearCliente;
