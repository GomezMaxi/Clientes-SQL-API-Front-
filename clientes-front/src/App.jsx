// src/App.jsx
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import CrearCliente from "./pages/CrearCliente";
import EditarCliente from "./pages/EditarCliente";
import DetalleCliente from "./pages/DetalleCliente";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/crear" component={CrearCliente} />
          <Route path="/editar/:id" component={EditarCliente} />
          <Route path="/detalle/:id" component={DetalleCliente} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
