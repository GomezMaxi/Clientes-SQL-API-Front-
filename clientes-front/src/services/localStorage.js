const STORAGE_KEY = "clientes";

export const guardarClientesLS = (clientes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
};

export const cargarClientesLS = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};
