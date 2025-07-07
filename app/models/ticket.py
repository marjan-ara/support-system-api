from sqlalchemy import Column,  String, ForeignKey, Text,DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
import uuid

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(UUID(as_uuid=True),primary_key=True, default=uuid.uuid4, unique=True, index=True)
    title = Column(String)
    description = Column(Text)
    status = Column(String, default="open")  # e.g., open, in_progress, closed
    priority = Column(String, default="medium")  # e.g., low, medium, high
    created_at = Column(DateTime)  
    updated_at = Column(DateTime)  
    contact_id = Column(UUID(as_uuid=True), ForeignKey("contacts.id"), nullable=True)

    contact = relationship("Contact", back_populates="tickets")
    notes = relationship("Note", back_populates="ticket")