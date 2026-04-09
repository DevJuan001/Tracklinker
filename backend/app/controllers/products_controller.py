from app.repository.products_repository import ProductsRepository
from app.models.product_model import UpdateProduct, Product
from fastapi import HTTPException


class ProductsController:
    @staticmethod
    def get_all_products():
        error, products = ProductsRepository.find_all_products()

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": products
        }

    @staticmethod
    def get_all_input_orders():
        error, input_orders = ProductsRepository.find_all_input_orders()

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": input_orders
        }

    @staticmethod
    def get_all_product_brands():
        error, brands = ProductsRepository.find_all_product_brands()

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": brands
        }

    @staticmethod
    def get_all_product_models():
        error, models = ProductsRepository.find_all_product_models()

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": models
        }
    
    @staticmethod
    def get_all_product_status():
        error, status = ProductsRepository.find_all_product_status()

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": status
        }

    @staticmethod
    def create_product(product_data: Product):
        error, success, message = ProductsRepository.create_product(
            product_data)

        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "sucess": success,
            "message": message
        }

    @staticmethod
    def create_product_model(product_model):
        error, success, message = ProductsRepository.create_product_details(product_model)

        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "sucess": success,
            "message": message
        }

    @staticmethod
    def create_product_brand(product_brand):
        error, success, message = ProductsRepository.create_product_brand(
            product_brand)

        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "sucess": success,
            "message": message
        }

    @staticmethod
    def create_input_order(input_order):
        error, success, message = ProductsRepository.create_input_order(
            input_order)

        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "sucess": success,
            "message": message
        }

    @staticmethod
    def update_product(product_data: UpdateProduct):
        error, success, message = ProductsRepository.update_product(product_data)
        
        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "success": success,
            "message": message
        }

    @staticmethod
    def update_product_status(product_data: dict):
        error, success, message = ProductsRepository.update_product_status(product_data)
        
        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "success": success,
            "message": message
        }
