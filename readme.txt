Hola, soy Valentina

Aquí están las instrucciones para usar: Registro de Lugares para Comer

Descripción: 
- Esta aplicación web permite a los usuarios registrar, visualizar, filtrar, editar y eliminar lugares para comer. 
- Cuenta con un frontend desarrollado en React y un backend en FastAPI con una base de datos SQLAlchemy. 
- El diseño usa Bootstrap para una experiencia visual agradable y responsiva.

------------------------------------------------------

Tecnologías usadas

Frontend: react, Bootstrap, JavaScript
Backend: FastAPI, SQLAlchemy, Pydantic
Base de datos: SQLite / PostgreSQL (esto depende de la configuración)
CORS: configurado para permitir comunicación entre frontend y backend

------------------------------------------------------

Funcionalidades:

Agregar lugar: formulario para crear un nuevo lugar con nombre, ubicación, tipo de comida, calificación y estado (si fue o no visitado).
Lista de lugares: muestra todos los lugares registrados.
Filtrar lugares: fintros por ubicación, tipo de comida, calificación mínima y estado visitado.
Editar lugar: editar los datos de un lugar existente, esto se edita en el mismo lugar donde se ingresan.
Eliminar lugar: elimina un lugar.
Mensajes de confirmación: feedback visual al agregar, editar o eliminar.

------------------------------------------------------

Instalación y configuración

Backend

1. Crear y activar entorno virtual:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

2. Instalar dependencias:

```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

3. Ejecutar backend:

```bash
uvicorn main:app --reload
```

Asegurar que el backend corra en `http://localhost:8000`

------------------------------------------------------

Frontend

1. Clonar repositorio y entrar a la carpeta frontend:

```bash
git clone <tu-repo-url>
cd frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar app React:

```bash
npm start
```

La app correrá en `http://localhost:3000` o `http://localhost:5173` según configuración.

------------------------------------------------------

Uso

1. Abrir la app en el navegador.
2. Agregar un nuevo lugar desde el formulario.
3. Visualizar la lista de lugares.
4. Usar los filtros para buscar lugares específicos.
5. Editar un lugar haciendo click en el ícono de edición.
6. Eliminar un lugar.
7. Recibir mensajes de estado (éxito o error) en las acciones.

------------------------------------------------------

Estructura del proyecto

```
/backend
  ├─ main.py             # FastAPI app principal con rutas y lógica
  ├─ models.py           # Definición de modelos SQLAlchemy
  ├─ schemas.py          # Modelos Pydantic para validación
  ├─ crud.py             # Funciones para operaciones CRUD
  ├─ database.py         # Configuración de la base de datos y sesión
/frontend
  ├─ src/
      ├─ App.jsx         # Componente principal
      ├─ LugarForm.jsx   # Formulario para agregar/editar lugares
      ├─ LugarTable.jsx  # Tabla para mostrar lugares con filtros
      ├─ ConfirmarEliminarModal.jsx # Modal para confirmación eliminación
      ├─ index.js
  ├─ package.json
  ├─ ...
```
------------------------------------------------------

Personalización de estilos

Colores y fondo pensados en los colores de Genomawork 
Bootstrap para diseño responsivo y componentes

------------------------------------------------------

Notas

* El backend está configurado para CORS con origen `http://localhost:5173` (cambiar si es necesario).
* La base de datos se crea automáticamente si no existe.
* El filtrado principal se realiza en backend, pero también se hace filtrado extra en frontend para rapidez visual.

------------------------------------------------------

Referencias y páginas utilizadas:

https://getbootstrap.com/
https://fastapi.tiangolo.com/
https://docs.sqlalchemy.org/
https://pydantic.dev/
https://reactjs.org/docs/getting-started.html
https://getbootstrap.com/docs/5.3/components/alerts/
https://fastapi.tiangolo.com/tutorial/
https://docs.sqlalchemy.org/en/20/tutorial/
https://pydantic.dev/usage/models/


