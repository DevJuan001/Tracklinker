from pydantic import BaseModel
from typing import Optional


class ProductDetails(BaseModel):
    product_details_id: Optional[int] = None
    product_brand_id: int
    product_detail_model: str
    product_detail_description: str


class UpdateProductDetails(BaseModel):
    product_brand_id: Optional[int] = None
    product_details_id: Optional[str] = None
