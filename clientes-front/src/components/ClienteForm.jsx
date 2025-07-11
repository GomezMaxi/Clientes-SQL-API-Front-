import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { z } from "zod";
import "./ClienteForm.css"; 

//Validaciones base del formulario con zod
const schema = z.object({
  dni: z.string().min(7, "DNI inválido"),
  apellido: z.string().min(1, "Campo requerido"),
  nombre: z.string().min(1, "Campo requerido"),
  direccion: z.string().min(1, "Campo requerido"),
  telefono: z
    .string()
    .optional()
    .nullable()
    .transform(val => (val === "" ? null : val)),
});

//Defino el componente e inicio el formulario permitiendo edicion
function ClienteForm({ defaultValues, onSubmit, esEdicion = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  //Validacion para ver si el DNI existe
  const onSubmitConValidacion = (data) => {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    const dniExiste = clientes.some(
      (c) =>
        c.dni === data.dni &&
        (!esEdicion || c.dni !== defaultValues?.dni)
    );

    if (dniExiste) {
      setError("dni", {
        type: "manual",
        message: "Ya existe un cliente con ese DNI",
      });
      return;
    }

    onSubmit(data);
  };

  //Devuelvo el formulario
  return (
    <form onSubmit={handleSubmit(onSubmitConValidacion)} className="formulario-cliente">
      <input className="form-input" placeholder="DNI" {...register("dni")} />
      {errors.dni && <p className="form-error">{errors.dni.message}</p>}

      <input className="form-input" placeholder="Apellido" {...register("apellido")} />
      {errors.apellido && <p className="form-error">{errors.apellido.message}</p>}

      <input className="form-input" placeholder="Nombre" {...register("nombre")} />
      {errors.nombre && <p className="form-error">{errors.nombre.message}</p>}

      <input className="form-input" placeholder="Dirección" {...register("direccion")} />
      {errors.direccion && <p className="form-error">{errors.direccion.message}</p>}

      <input className="form-input" placeholder="Teléfono (opcional)" {...register("telefono")} />
      {errors.telefono && <p className="form-error">{errors.telefono.message}</p>}

      <button type="submit" className="form-button">Guardar</button>
    </form>
  );
}

export default ClienteForm;
