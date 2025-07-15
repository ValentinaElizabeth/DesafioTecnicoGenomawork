// filtros de busqueda 
import { useState } from "react";

export default function Filtros({ onFiltrar }) {
  const [ubicacion, setUbicacion] = useState("");
  const [pais, setPais] = useState("");
  const [calificacionMin, setCalificacionMin] = useState("");
  const [visitado, setVisitado] = useState("");

  const aplicarFiltros = () => {
    onFiltrar({
      ubicacion,
      pais,
      calificacionMin,
      visitado,
    });
  };

  return (
    <div className="card p-3 mb-4" style={{ backgroundColor: "#ebeaeb" }}>
      <h5 className="mb-3 text-dark">Filtros</h5>
      <div className="row g-2">
        <div className="col-md-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            placeholder="Ej: Valparaíso"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">País (backend)</label>
          <input
            type="text"
            className="form-control"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            placeholder="Ej: Chile"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Calificación mínima</label>
          <input
            type="number"
            className="form-control"
            min={1}
            max={5}
            value={calificacionMin}
            onChange={(e) => setCalificacionMin(e.target.value)}
            placeholder="Ej: 3"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Visitado</label>
          <select
            className="form-select"
            value={visitado}
            onChange={(e) => setVisitado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="mt-4 text-end">
        <button
          className="btn"
          style={{
            backgroundColor: "#ef7ba6",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            padding: "8px 20px",
            borderRadius: "6px",
          }}
          onClick={aplicarFiltros}
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}
