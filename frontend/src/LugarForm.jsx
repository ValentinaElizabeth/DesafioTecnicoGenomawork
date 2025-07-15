//formulario del lugar
import { useEffect, useState } from "react";

export default function LugarForm({ lugar, onGuardar, onCancel }) {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipoComida, setTipoComida] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [visitado, setVisitado] = useState(false);

  useEffect(() => {
    if (lugar) {
      setNombre(lugar.nombre);
      setUbicacion(lugar.ubicacion);
      setTipoComida(lugar.tipo_comida);
      setCalificacion(lugar.calificacion ?? "");
      setVisitado(lugar.visitado);
    } else {
      setNombre("");
      setUbicacion("");
      setTipoComida("");
      setCalificacion("");
      setVisitado(false);
    }
  }, [lugar]);

  const validarUbicacion = (ubicacion) => {
    const partes = ubicacion.split(",").map((p) => p.trim()).filter(Boolean);
    return partes.length >= 2 && partes.length <= 4;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!validarUbicacion(ubicacion)) {
    alert("La ubicación debe tener entre 2 y 4 partes separadas por coma (ej: calle, comuna, ciudad, país)");
    return;
  }
    const lugarData = {
      nombre,
      ubicacion,
      tipo_comida: tipoComida,
      calificacion: calificacion ? parseFloat(calificacion) : null,
      visitado,
    };

    try {
      const url = lugar
        ? `http://localhost:8000/lugares/${lugar.id}`
        : "http://localhost:8000/lugares";

      const method = lugar ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lugarData),
      });

      if (!res.ok) throw new Error("Error guardando lugar");

      const data = await res.json();

      onGuardar(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const styles = {
    form: {
      marginTop: 20,
      maxWidth: 400,
      padding: 20,
      border: "1px solid #ccc",
      borderRadius: 8,
      backgroundColor: "#fafafa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    field: {
      marginBottom: 15,
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: 6,
      fontWeight: "600",
      color: "#333",
    },
    input: {
      padding: "8px 10px",
      fontSize: 14,
      borderRadius: 4,
      border: "1px solid #ccc",
      outline: "none",
      transition: "border-color 0.2s",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 4,
    },
    starContainer: {
      fontSize: 24,
      cursor: "pointer",
      userSelect: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    },
    star: {
      transition: "color 0.2s",
    },
    button: {
      padding: "10px 18px",
      fontSize: 15,
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      backgroundColor: "#ef7ba6",
      color: "white",
      fontWeight: "600",
      marginRight: 10,
      transition: "background-color 0.3s",
    },
    buttonCancel: {
      padding: "10px 18px",
      fontSize: 15,
      borderRadius: 6,
      border: "1px solid #ccc",
      cursor: "pointer",
      backgroundColor: "white",
      color: "#333",
      fontWeight: "600",
      transition: "background-color 0.3s",
    },
    buttonSmall: {
      marginLeft: 7,
      fontSize: 12,
      padding: "4px 8px",
      height: 24,
      borderRadius: 4,
      border: "1px solid #ccc",
      cursor: "pointer",
      backgroundColor: "white",
      color: "#333",
      fontWeight: "600",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label htmlFor="nombre" style={styles.label}>Nombre lugar:</label>
        <input
          id="nombre"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
          placeholder="Ej: Empanadas Florencia"
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="ubicacion" style={styles.label}>Ubicación (Ciudad, País):</label>
        <input
          id="ubicacion"
          required
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          placeholder="Ej: Santiago, Chile"
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="tipoComida" style={styles.label}>Tipo de comida:</label>
        <input
          id="tipoComida"
          required
          value={tipoComida}
          onChange={(e) => setTipoComida(e.target.value)}
          placeholder="Ej: sushi, hamburguesas"
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Calificación:</label>
        <div style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setCalificacion(num)}
              style={{
                ...styles.star,
                color: num <= calificacion ? "#ef7ba6" : "#8d95a7",
              }}
              role="button"
              aria-label={`${num} estrellas`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setCalificacion(num);
              }}
            >
              {num <= calificacion ? "★" : "☆"}
            </span>
          ))}
          <button
            type="button"
            onClick={() => setCalificacion(null)}
            style={styles.buttonSmall}
            aria-label="Borrar calificación"
          >
            Borrar
          </button>
        </div>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={visitado}
            onChange={(e) => setVisitado(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          ¿Visitado?
        </label>
      </div>
      <div>
        <button type="submit" style={styles.button}>
          {lugar ? "Actualizar" : "Agregar"}
        </button>
        {lugar && (
          <button
            type="button"
            onClick={onCancel}
            style={styles.buttonCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
