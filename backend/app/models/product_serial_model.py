from pydantic import BaseModel
from datetime import datetime

class ProductSerial(BaseModel):
    product_serial: str
    product_id: int
    input_order_id: int
    product_garanty_input: datetime