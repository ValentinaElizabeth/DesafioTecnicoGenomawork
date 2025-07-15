from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
import schemas
import crud
from database import engine, SessionLocal, Base

# crear las tablas definidas en models
Base.metadata.create_all(bind=engine)

# crear instancia principal de la aplicación
app = FastAPI()


# CONFIGURACIÓN DE CORS
# acceso desde el frontend que corre en localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # reemplazar
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


# CONEXIÓN A LA BD
def get_db():
    db = SessionLocal()
    try:
        yield db  
    finally:
        db.close()  


# PRUEBA
@app.get("/")
def read_root():
    return {"message": "Hola Mundo"}

@app.get("/lugares", response_model=list[schemas.Lugar])
def listar_lugares(db: Session = Depends(get_db)):
    return crud.get_lugares(db)

# FILTRAR LUGARES
@app.get("/lugares/filtro", response_model=list[schemas.Lugar])
def filtrar_lugares(
    pais: str = Query("", alias="pais"),  
    tipo: str = Query("", alias="tipo"), 
    calificacionMin: float = Query(None, alias="calificacionMin"),  
    visitado: bool = Query(None, alias="visitado"), 
    db: Session = Depends(get_db)
):
    query = db.query(models.Lugar)
    if pais:
        query = query.filter(models.Lugar.ubicacion.ilike(f"%{pais}%"))
    if tipo:
        query = query.filter(models.Lugar.tipo_comida.ilike(f"%{tipo}%"))
    if calificacionMin is not None:
        query = query.filter(models.Lugar.calificacion >= calificacionMin)
    if visitado is not None:
        query = query.filter(models.Lugar.visitado == visitado)
    return query.all()

# CREAR UN NUEVO LUGAR
@app.post("/lugares", response_model=schemas.Lugar)
def crear_lugar(lugar: schemas.LugarCreate, db: Session = Depends(get_db)):
    return crud.create_lugar(db, lugar)

# EDITAR LUGAR
@app.put("/lugares/{id}", response_model=schemas.Lugar)
def editar_lugar(id: int, lugar: schemas.LugarUpdate, db: Session = Depends(get_db)):
    lugar_editado = crud.update_lugar(db, id, lugar)
    if lugar_editado is None:
        raise HTTPException(status_code=404, detail="Lugar no encontrado")
    return lugar_editado

# ELIMINAR UN LUGAR
@app.delete("/lugares/{id}")
def eliminar_lugar(id: int, db: Session = Depends(get_db)):
    lugar_eliminado = crud.delete_lugar(db, id)
    if lugar_eliminado is None:
        raise HTTPException(status_code=404, detail="Lugar no encontrado")
    return {"detail": "Lugar eliminado"}
