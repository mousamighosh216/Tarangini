# Defines:
# cycle entries
# start_date
# end_date
# symptoms (JSON)
# user_id
# predicted flag

from sqlalchemy import Column, Integer, Date, ForeignKey
from app.db.base import Base

class CycleEntry(Base):
    __tablename__ = "cycle_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    period_start = Column(Date)
    cycle_length = Column(Integer)