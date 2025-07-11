import axios from "axios";

const API_URL = "https://localhost:7027/api/clientes"; // Puerto corregido

export const getClientes = () => axios.get(API_URL);
export const getCliente = (id) => axios.get(`${API_URL}/${id}`);
export const createCliente = (cliente) => axios.post(API_URL, cliente);
export const updateCliente = (id, cliente) => axios.put(`${API_URL}/${id}`, cliente);
export const deleteCliente = (id) => axios.delete(`${API_URL}/${id}`);

