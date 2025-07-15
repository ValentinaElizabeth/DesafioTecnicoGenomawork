// tabla de lugares
import { useState, useMemo } from "react";

export default function LugarTable({ lugares, onEditar, onEliminar }) {
  const [orden, setOrden] = useState([]);
  const [filtros, setFiltros] = useState({
    ubicacion: "",
    tipoComida: "",
    calificacionMin: "",
    visitado: "",
  });

  const ordenar = (campo) => {
    setOrden((prevOrden) => {
      const index = prevOrden.findIndex((o) => o.campo === campo);

      if (index !== -1) {
        const actualAsc = prevOrden[index].asc;
        if (actualAsc === true) {
          const copia = [...prevOrden];
          copia[index].asc = false;
          return copia;
        } else {
          return prevOrden.filter((_, i) => i !== index);
        }
      } else {
        return [{ campo, asc: true }, ...prevOrden];
      }
    });
  };

  const lugaresFiltrados = useMemo(() => {
    return lugares
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
          ? lugar.tipo_comida
              .toLowerCase()
              .includes(filtros.tipoComida.toLowerCase())
          : true
      );
  }, [lugares, filtros]);

  const lugaresOrdenados = useMemo(() => {
    if (orden.length === 0) return lugaresFiltrados;

    return [...lugaresFiltrados].sort((a, b) => {
      for (let { campo, asc } of orden) {
        const valA = a[campo];
        const valB = b[campo];

        if (valA == null && valB == null) continue;
        if (valA == null) return 1;
        if (valB == null) return -1;

        let resultado;

        if (typeof valA === "string" && typeof valB === "string") {
          resultado = valA.localeCompare(valB);
        } else if (typeof valA === "number" && typeof valB === "number") {
          resultado = valA - valB;
        } else if (typeof valA === "boolean" && typeof valB === "boolean") {
          resultado = valA === valB ? 0 : valA ? -1 : 1;
        } else {
          resultado = String(valA).localeCompare(String(valB));
        }

        if (resultado !== 0) return asc ? resultado : -resultado;
      }
      return 0;
    });
  }, [lugaresFiltrados, orden]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="mb-3 p-2 bg-light rounded shadow-sm d-flex flex-wrap gap-2 align-items-center">
        <input
          type="text"
          name="ubicacion"
          className="form-control form-control-sm"
          placeholder="Filtrar por ubicación"
          value={filtros.ubicacion}
          onChange={handleFiltroChange}
          style={{ minWidth: "150px" }}
        />
        <input
          type="text"
          name="tipoComida"
          className="form-control form-control-sm"
          placeholder="Filtrar por tipo comida"
          value={filtros.tipoComida}
          onChange={handleFiltroChange}
          style={{ minWidth: "150px" }}
        />
        <input
          type="number"
          min="1"
          max="5"
          name="calificacionMin"
          className="form-control form-control-sm"
          placeholder="Calificación mínima"
          value={filtros.calificacionMin}
          onChange={handleFiltroChange}
          style={{ width: "120px" }}
        />
        <select
          name="visitado"
          className="form-select form-select-sm"
          value={filtros.visitado}
          onChange={handleFiltroChange}
          style={{ width: "130px" }}
        >
          <option value="">Todos</option>
          <option value="true">Visitados</option>
          <option value="false">No visitados</option>
        </select>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() =>
            setFiltros({
              ubicacion: "",
              tipoComida: "",
              calificacionMin: "",
              visitado: "",
            })
          }
          type="button"
        >
          Limpiar filtros
        </button>
      </div>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light" style={{ cursor: "pointer" }}>
          <tr>
            {["nombre", "ubicacion", "tipo_comida", "calificacion", "visitado"].map(
              (campo) => {
                const ordenCol = orden.find((o) => o.campo === campo);
                return (
                  <th
                    key={campo}
                    onClick={() => ordenar(campo)}
                    style={{ userSelect: "none" }}
                  >
                    {campo.charAt(0).toUpperCase() +
                      campo.slice(1).replace(/_/g, " ")}
                    <span
                      style={{ marginLeft: 5, fontWeight: "bold", color: "#d96a93" }}
                    >
                      {ordenCol ? (ordenCol.asc ? " ▲" : " ▼") : " ⇵"}
                    </span>
                  </th>
                );
              }
            )}
            <th style={{ width: "130px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lugaresOrdenados.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay datos para mostrar
              </td>
            </tr>
          ) : (
            lugaresOrdenados.map((lugar) => (
              <tr key={lugar.id}>
                <td>{lugar.nombre}</td>
                <td>{lugar.ubicacion}</td>
                <td>{lugar.tipo_comida}</td>
                <td>{lugar.calificacion ?? "N/A"}</td>
                <td>
                  <input type="checkbox" checked={lugar.visitado} readOnly />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEditar(lugar)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onEliminar(lugar.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
