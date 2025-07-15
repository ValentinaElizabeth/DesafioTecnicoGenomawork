# importaciones necesarias para definir validación de datos
from pydantic import BaseModel
from typing import Optional

# atributos comunes de lugar
class LugarBase(BaseModel):
    nombre: str                        
    ubicacion: str                      
    tipo_comida: str                    
    calificacion: Optional[float] = None  
    visitado: bool = False             

# creación de un nuevo lugar
class LugarCreate(LugarBase):
    pass 

# actualización de un lugar
class LugarUpdate(LugarBase):
    pass

# frontend recibe al consultar lugares
class Lugar(LugarBase):
    id: int  
    class Config:
        orm_mode = True  
