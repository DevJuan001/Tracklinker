from app.repository.products_repository import ProductsRepository
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
    def get_all_and_new_products_ammount():
        error, data = ProductsRepository.find_all_and_new_products_ammount()

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": data
        }

    @staticmethod
    def get_products_added_by_date_range(start_date: str, end_date: str):
        error, products = ProductsRepository.find_products_added_by_date_range(
            start_date, end_date)

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": products
        }

    @staticmethod
    def get_products_deleted_by_date_range(start_date: str, end_date: str):
        error, products = ProductsRepository.find_products_deleted_by_date_range(
            start_date, end_date)

        if error:
            raise HTTPException(status_code=404, detail=error)

        return {
            "data": products
        }

    @staticmethod
    def get_products_out_of_stock():
        error, products = ProductsRepository.find_products_out_of_stock()

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
    def create_product(product_garanty_input):
        error, success, message = ProductsRepository.create_product(
            product_garanty_input)

        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "sucess": success,
            "message": message
        }

    @staticmethod
    def create_product_model(product_model):
        error, success, message = ProductsRepository.create_product_model(
            product_model)

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
        error, success, message = ProductsRepository.create_input_order(input_order)

        if error:
            raise HTTPException(status_code=400, detail=error)
        return {
            "sucess": success,
            "message": message
        }
