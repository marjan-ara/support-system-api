# These are database operations.


from sqlalchemy.orm import Session
from app import schemas
from app.models.contact import Contact
from app.models.ticket import Ticket
from app.models.note import Note
from uuid import UUID

def create_contact(db: Session, contact: schemas.ContactCreate):
    db_contact = Contact(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def get_contact_by_id(db: Session, contact_id: UUID):
    return db.query(Contact).filter(Contact.id == contact_id).first()

def get_contacts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Contact).offset(skip).limit(limit).all()

def create_ticket(db: Session, ticket: schemas.TicketCreate):
    db_ticket = Ticket(**ticket.dict())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

def get_tickets(db:Session,skip:int,limit:int):
    return db.query(Ticket).offset(skip).limit(limit).all()

def add_note(db: Session, ticket_id: UUID, note: schemas.NoteCreate):
    db_note = Note(ticket_id=ticket_id, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note
