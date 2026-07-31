from typing import Optional
from datetime import datetime

from pydantic import BaseModel



class CustomerSessionStart(BaseModel):

    table_id: int

    customer_name: Optional[str] = None

    customer_mobile: Optional[str] = None


class CustomerSessionResponse(BaseModel):

    session_id: int

    table_id: int

    customer_name: Optional[str]

    customer_mobile: Optional[str]

    status: str

    started_at: datetime

    ended_at: Optional[datetime]

    model_config = {
        "from_attributes": True
    }
    
class ResumeSessionRequest(BaseModel):
    table_id: int
    customer_mobile: str