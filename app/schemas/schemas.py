import uuid
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None       
    
class ContactCreate(ContactBase):
        pass

class Contact(ContactBase):
    id: uuid.UUID 
    tickets: List['Ticket'] = []  
    class Config:
        orm_mode = True

class NoteBase(BaseModel):
    content: str
    created_at: datetime
    updated_at: datetime
    ticket_id: uuid.UUID  


class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: uuid.UUID 
    class Config:
        orm_mode = True

class TicketBase(BaseModel):
    title: str
    description: str
    status: Optional[str] = "open"  # e.g., open, in_progress, closed
    priority: Optional[str] = "medium"  # e.g., low, medium, high
    created_at: datetime
    updated_at: datetime
    # contact_id is optional to allow tickets without a contact
    contact_id: Optional[uuid.UUID ] = None  

class TicketCreate(TicketBase):
    pass

class Ticket(TicketBase):
    id: uuid.UUID 
    notes: List[Note] = []
    class Config:
        orm_mode = True