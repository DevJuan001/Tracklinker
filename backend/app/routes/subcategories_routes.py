from fastapi import APIRouter
from app.controllers.subcategories_controller import SubcategoriesController
from fastapi import Depends
from app.middlewares.roles_middleware import require_roles


router = APIRouter(
    prefix="/api/subcategories",
    tags=["subcategories"]
)
# Endpoint para obtener todas las subcategorías
@router.get("/")
def get_all_subcategories(
    start_date: str = None,
    end_date: str = None,
    category_order: int = None,
):
    return SubcategoriesController.get_all_subcategories(
        start_date,
        end_date,
        category_order,
    )


# Endpoint para obtener una subcategoría mediante el id
@router.get("/{subcategory_id}")
def get_subcategory_by_id(subcategory_id: int):
    return SubcategoriesController.get_subcategory_by_id(subcategory_id) 


# Endpoint para crear o registrar una subcategoría
@router.post("/create")
def create_subcategory(
    subcategory_data: dict,
    payload: dict = Depends(require_roles(["Admin"]))
):
    return SubcategoriesController.create_subcategory(subcategory_data)


# Endpoint para actualizar la información de una subcategoría existente mediante su id
@router.put("/update/{subcategory_id}")
def update_subcategory(
    subcategory_id: int,
    subcategory_data: dict,
    payload: dict = Depends(require_roles(["Admin"]))
):
    return SubcategoriesController.update_subcategory(subcategory_id, subcategory_data)


# Endpoint para eliminar una subcategoría mediante su id
@router.delete("/delete/{subcategory_id}")
def delete_subcategory(
    subcategory_id: int,
    payload: dict = Depends(require_roles(["Admin"]))
):
    return SubcategoriesController.delete_subcategory(subcategory_id) 

     



