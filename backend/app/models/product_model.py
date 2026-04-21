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
    id: int
    input_order: Optional[int] = None
    subcategory: Optional[int] = None
    serial: Optional[str] = None
    brand: Optional[int] = None
    model: Optional[int] = None
    warranty_time: Optional[datetime] = None
    status: Optional[int] = None
