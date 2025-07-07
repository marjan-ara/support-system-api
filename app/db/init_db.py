from app.db.database import Base, engine
from app.models import contact,note,ticket  # Ensure all models are imported so Base.metadata sees them

def init():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init()