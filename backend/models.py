# importaciones necesarias para definir columnas y tipos de datos
from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base 

# modelo representa la tabla "lugares" en la base de datos
class Lugar(Base):
    __tablename__ = "lugares" 

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    ubicacion = Column(String, nullable=False)
    tipo_comida = Column(String, nullable=False)
    calificacion = Column(Float, nullable=True)
    visitado = Column(Boolean, default=False)

