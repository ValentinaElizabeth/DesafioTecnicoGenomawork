from sqlalchemy.orm import Session
import models, schemas

# lugares desde la BD
def get_lugares(db: Session):
    return db.query(models.Lugar).all()

# crear un lugar en la BD 
def create_lugar(db: Session, lugar: schemas.LugarCreate):
    nuevo = models.Lugar(**lugar.dict())
    db.add(nuevo)         
    db.commit()           
    db.refresh(nuevo)     
    return nuevo

def update_lugar(db: Session, id: int, lugar: schemas.LugarUpdate):
    lugar_db = db.query(models.Lugar).filter(models.Lugar.id == id).first()
    if not lugar_db:
        return None

    for key, value in lugar.dict(exclude_unset=True).items():
        setattr(lugar_db, key, value)

    db.commit()          
    db.refresh(lugar_db) 
    return lugar_db

def delete_lugar(db: Session, id: int):
    lugar_db = db.query(models.Lugar).filter(models.Lugar.id == id).first()
    if not lugar_db:
        return None
    db.delete(lugar_db)   
    db.commit()           
    return lugar_db
