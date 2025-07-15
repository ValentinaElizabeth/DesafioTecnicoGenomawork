import { useEffect, useState } from "react";
import LugarTable from "./LugarTable";
import LugarForm from "./LugarForm";
import ConfirmarEliminarModal from "./ConfirmarEliminarModal.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [lugares, setLugares] = useState([]);          
  const [loading, setLoading] = useState(true);         
  const [editLugar, setEditLugar] = useState(null);     
  const [idParaEliminar, setIdParaEliminar] = useState(null);
  const [mensaje, setMensaje] = useState("");           

  const [filtros, setFiltros] = useState({
    ubicacion: "",
    tipoComida: "",
    calificacionMin: "",
    visitado: "",
  });

  const cargarLugares = async () => {
    setLoading(true);
    try {
      const url = "http://localhost:8000/lugares";
      const res = await fetch(url);
      const data = await res.json();
      setLugares(data);
    } catch (error) {
      console.error("Error cargando lugares", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarLugares();
  }, []);

  const aplicarFiltrosFrontend = (data) => {
    return data
      .filter((lugar) =>
        lugar.ubicacion.toLowerCase().includes(filtros.ubicacion.toLowerCase())
      )
      .filter((lugar) =>
        filtros.calificacionMin
          ? lugar.calificacion >= parseFloat(filtros.calificacionMin)
          : true
      )
      .filter((lugar) =>
        filtros.visitado !== ""
          ? lugar.visitado === (filtros.visitado === "true")
          : true
      )
      .filter((lugar) =>
        filtros.tipoComida
          ? lugar.tipoComida
              .toLowerCase()
              .includes(filtros.tipoComida.toLowerCase())
          : true
      );
  };

  // datos que muestra la tabla despues del filtro
  const lugaresFiltrados = aplicarFiltrosFrontend(lugares);

  //  nuevo lugar a la lista
  const agregarLugar = (nuevo) => {
    setLugares((prev) => [...prev, nuevo]);
    setMensaje("✅ Lugar agregado correctamente");
    setTimeout(() => setMensaje(""), 3000);
  };

  // editar un lugar existente
  const actualizarLugar = (lugarActualizado) => {
    setLugares((prev) =>
      prev.map((l) => (l.id === lugarActualizado.id ? lugarActualizado : l))
    );
    setEditLugar(null); 
  };

  // confirmar la eliminación de un lugar
  const confirmarEliminar = async () => {
    try {
      const res = await fetch(`http://localhost:8000/lugares/${idParaEliminar}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLugares((prev) => prev.filter((l) => l.id !== idParaEliminar));
      }
    } catch (error) {
      alert("Error eliminando lugar");
    } finally {
      setIdParaEliminar(null);
    }
  };

  // interfaz principal
  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: "#ebeaeb", fontSize: "0.9rem" }}
    >
      <div className="container py-3">
        {/* Título de la app */}
        <h1
          className="text-center mb-4"
          style={{ color: "#ef7ba6", fontSize: "1.8rem" }}
        >
          🍽️ Registro de lugares para comer
        </h1>

        {/* msj de confirmación */}
        {mensaje && (
          <div
            className="alert alert-success text-center"
            role="alert"
            style={{ fontWeight: "bold" }}
          >
            {mensaje}
          </div>
        )}

        {/* agregar/editar lugar */}
        <div className="card shadow-sm mb-3">
          <div
            className="card-header fw-semibold"
            style={{ backgroundColor: "#8d95a7", color: "#fff", fontSize: "1rem" }}
          >
            {editLugar ? "✏️ Editar lugar" : "➕ Agregar lugar"}
          </div>
          <div className="card-body p-3">
            <LugarForm
              lugar={editLugar}
              onCancel={() => setEditLugar(null)}
              onGuardar={(lugar) => {
                if (editLugar) {
                  actualizarLugar(lugar);
                } else {
                  agregarLugar(lugar);
                }
              }}
            />
          </div>
        </div>

        {/* tabla con los lugares + filtros y ordenamiento */}
        <div className="card shadow-sm mb-3" style={{ borderColor: "#3f464b" }}>
          <div className="card-body p-3">
            {loading ? (
              <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status" />
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              <LugarTable
                lugares={lugaresFiltrados}
                filtros={filtros}
                setFiltros={setFiltros}
                onEditar={setEditLugar}
                onEliminar={(id) => setIdParaEliminar(id)}
              />
            )}
          </div>
        </div>

        {/* confirmación de eliminación */}
        <ConfirmarEliminarModal
          show={idParaEliminar !== null}
          onClose={() => setIdParaEliminar(null)}
          onConfirm={confirmarEliminar}
        />
      </div>
    </div>
  );
}

export default App;
