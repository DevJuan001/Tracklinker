from fastapi import HTTPException
from app.repository.guarantees_repository import GuaranteeRepository
from app.models.guarantiees_model import Guarantee

from app.core.config import settings

class GuaranteeController:
       
    @staticmethod
    def get_all_guarantee():
        error, guarantiee = GuaranteeRepository.find_all_guarantiee()
        if error:
            raise HTTPException(status_code=404, detail=error)
        return {
            "data": guarantiee
        }
    
    @staticmethod
    def get_guarantiee_by_id(warranty_incidents_id: int):
        error, guarantiee = GuaranteeRepository.find_by_id(warranty_incidents_id)
        if error:
            raise HTTPException(status_code=404, detail=error)
        return {
            "data": guarantiee
        }
   
    @staticmethod
    def create_guarantiee(warranty_data: Guarantee):
        error, success, message = GuaranteeRepository.create(warranty_data)
        if error:
            raise HTTPException (status_code=400, detail=error)
        return{
            "success":success,
            "message": message
        }

    @staticmethod
    def update_garantee(warranty_incidents_id:int, warranty_date: dict):
        error, success, message= GuaranteeRepository.update(warranty_incidents_id, warranty_date)
        if error:
            raise HTTPException(status_code=400, detail=error)
        return{
            "success": success,
            "message": message
        } 
    
    @staticmethod
    def delete_garantee(warranty_incidents_id:int):
        error, success, message= GuaranteeRepository.delete(warranty_incidents_id)
        if error:
            raise HTTPException(status_code=400, detail= error)
        return{
            "success": success,
            "message": message
        }
    @staticmethod
    def get_deleted_guarantees_by_date_range(start_date: str, end_date: str):
        error, guarantees = GuaranteeRepository.find_deleted_guarantees_by_date_range(
            start_date, end_date)

        if error:
            raise HTTPException(status_code=404, detail=error)
        return {
            "data": guarantees
        }
    @staticmethod
    def get_all_guarantees():
        error, guarantees = GuaranteeRepository.find_all_guarantees()
        if error:
            raise HTTPException(status_code=404, detail=error)
        return {
            "data": guarantees
        }
    @staticmethod
    def get_disabled_guarantees():
        error, guarantees = GuaranteeRepository.find_disabled_guarantees()
       
        if error:
           raise HTTPException(status_code=404, detail=error)
        return {
             "data": guarantees 
              }
    
    