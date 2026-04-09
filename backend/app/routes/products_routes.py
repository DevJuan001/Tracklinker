from fastapi import APIRouter, Depends
from app.controllers.products_controller import ProductsController
from app.middlewares.roles_middleware import require_roles
from app.models.product_model import Product
from app.models.product_details_model import ProductDetails
from app.models.product_brand_model import ProductBrand
from app.models.input_order_model import InputOrder

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# Endpoint para obtener todos los productos
@router.get("/")
def get_all_products():
    return ProductsController.get_all_products()

# Endpoint para obtener todos los productos y el numero de productos nuevos
@router.get("/all-and-new")
def get_old_and_new_products_ammount():
    return ProductsController.get_all_and_new_products_ammount()

# Endpoint para obtener todas las marcas de productos
@router.get("/brands")
def get_all_brands():
    return ProductsController.get_all_product_brands()

# Endpoint para obtener todos los modelos de productos
@router.get("/models")
def get_all_models():
    return ProductsController.get_all_product_models()  

# Endpoint para obtener las ordenes de entrada de productos
@router.get("/input-orders")
def get_all_input_orders():
    return ProductsController.get_all_input_orders()

# Endpoint para crear o agregar productos
@router.post("/create")
def create_product(product_data: Product):
    return ProductsController.create_product(product_data)

# Endpoint para crear o agregar modelos de productos
@router.post("/create-model")
def create_product_model(product_model: ProductDetails):
    return ProductsController.create_product_model(product_model)

# Endpoint para crear una marca de producto
@router.post("/create-brand")
def create_product_brand(product_brand: ProductBrand):
    return ProductsController.create_product_brand(product_brand)

# Endpoint para crear una orden de entrada de productos
@router.post("/create-input-order")
def create_product_entry(input_order: InputOrder):
    return ProductsController.create_input_order(input_order)