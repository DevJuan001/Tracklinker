from fastapi import APIRouter
from app.controllers.guarantees_controller import GuaranteeController
from fastapi import Depends
from app.models.guarantiees_model import Guarantee, GuaranteeUpdate
from app.middlewares.roles_middleware import require_roles



router =APIRouter(
    prefix="/api/warranty_incidents",
    tags= ["Warranty incidents"]
)

# Endpoint para obtener todos las solicitudes de garantía 
@router.get("/")
def get_all_guarantiee(
    start_date: str = None,
    end_date: str = None,
    status: int = None,
    payload: dict= Depends(require_roles(["Admin"]))
):
    return GuaranteeController.get_all_guarantee(
        start_date,
        end_date,
        status,
    )

# Endpoint para ontener solicitud por mediante id
@router.get("/{warranty_incidents_id}")
def get_guarantiee_by_id(
    warranty_incidents_id: int,
    payload: dict= Depends(require_roles(["Admin"]))
    ):
       return GuaranteeController.get_guarantiee_by_id(warranty_incidents_id)

# Endpont para crear o registrar incidencia de garantía
@router.post("/create")
def create_guarantiee(
    warranty_data: Guarantee,
    payload: dict = Depends (require_roles("Admin"))
    ):
    return GuaranteeController.create_guarantiee(warranty_data)

# Endpoint para actualizar la informacion de la incidencia mediante su id
@router.put("/update/{warranty_incidents_id}")
def update_garantee(
    warranty_incidents_id:int,
    warranty_data:  GuaranteeUpdate,
    payload: dict= Depends(require_roles(["Admin"]))

):
    return GuaranteeController.update_garantee(warranty_incidents_id, warranty_data)

@router.delete("/delete/{warranty_incidents_id}")
def delete_garantee(
    warranty_incidents_id:int,
    payload: dict = Depends (require_roles(["Admin"]))
):
  return GuaranteeController.delete_garantee(warranty_incidents_id)