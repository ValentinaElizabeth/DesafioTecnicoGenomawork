
import { useState } from "react";

// agregar un nuevo lugar
export default function AgregarLugar({ onLugarAgregado }) {
  // estados locales
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipoComida, setTipoComida] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [visitado, setVisitado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const nuevoLugar = {
      nombre,
      ubicacion,
      tipo_comida: tipoComida,
      calificacion: calificacion ? parseFloat(calificacion) : null,
      visitado,
    };

    try {
      const res = await fetch("http://localhost:8000/lugares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoLugar),
      });

      if (res.ok) {
        const lugarCreado = await res.json();
        onLugarAgregado(lugarCreado); //notificación, se ve arriba
        setNombre("");
        setUbicacion("");
        setTipoComida("");
        setCalificacion("");
        setVisitado(false);
      } else {
        alert("Error al crear lugar");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Lugar</h2>

      {/* nombre */}
      <input
        placeholder="Nombre lugar"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      {/* ubicación */}
      <input
        placeholder="Ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        required
      />

      {/* tipo de comida */}
      <input
        placeholder="Tipo de comida"
        value={tipoComida}
        onChange={(e) => setTipoComida(e.target.value)}
        required
      />

      {/* calificación esta es opcional!!! */}
      <input
        type="number"
        step="0.1"
        placeholder="Calificación"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
      />

      {/* checkbox para marcar si fue visitado */}
      <label>
        ¿Visitado?
        <input
          type="checkbox"
          checked={visitado}
          onChange={(e) => setVisitado(e.target.checked)}
        />
      </label>

      {/* enviar el formulario */}
      <button type="submit">Agregar lugar</button>
    </form>
  );
}
