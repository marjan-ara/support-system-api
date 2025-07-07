from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app import crud, schemas
from uuid import UUID
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/v1/contacts/")
def create_contact(contact: schemas.ContactCreate, db: Session = Depends(get_db)):
    return crud.create_contact(db, contact)

@router.get('/v1/contacts/', response_model=List[schemas.Contact])
def get_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_contacts(db, skip, limit)   

@router.post("/v1/tickets/")
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    if not ticket.contact_id and ticket.contact:
       new_contact=crud.create_contact(ticket.contact)
       ticket.contact_id=new_contact.id  
    return crud.create_ticket(db, ticket)

@router.get('/v1/tickets/',response_model=List[schemas.Ticket])
def get_ticket(skip:int=0, limit:int=100,db:Session=Depends(get_db)):
    return crud.get_tickets(db,skip,limit)

@router.post("/v1/tickets/{ticket_id}/notes/")
def add_note(ticket_id: UUID, note: schemas.NoteCreate, db: Session = Depends(get_db)):
    return crud.add_note(db, ticket_id, note)
