# These define how database tables are structured.

from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
import uuid

class Contact(Base):
    __tablename__ = "contacts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    name = Column(String)
    email = Column(String, unique=True,nullable=False)
    phone = Column(String)
    address = Column(Text)

    tickets = relationship("Ticket", back_populates="contact")