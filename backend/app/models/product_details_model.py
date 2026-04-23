from pydantic import BaseModel
from typing import Optional


class ProductDetails(BaseModel):
    product_details_id: Optional[int] = None
    model: int


class UpdateProductDetails(BaseModel):
    product_brand_id: Optional[int] = None
    product_details_id: Optional[str] = None
