from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Product(BaseModel):
    input_order_id: int
    subcategory_id: int
    product_serial: str
    product_brand_name: int
    product_details_id: int
    product_garanty_input: Optional[int] = None


class UpdateProduct(BaseModel):
    product_id: int
    input_order_id: int
    subcategory_id: int
    product_serial: str
    product_brand_id: int
    product_details_id: int
    product_garanty_input: datetime
    product_status: int
