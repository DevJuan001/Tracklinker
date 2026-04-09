from pydantic import BaseModel
from datetime import datetime

class Product(BaseModel):
    input_order_id: int
    subcategory_id: int
    product_serial: str
    product_brand_name: int
    product_details_id: int
    product_garanty_input: datetime