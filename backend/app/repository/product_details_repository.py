from app.core.database import get_connection
from app.models.product_details_model import ProductDetails, UpdateProductDetails


class ProductDetailsRepository:

    @staticmethod
    def find_all_product_models():
        connection = get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
            SELECT DISTINCT
                pb.product_brand_id,
                pd.product_details_id,
                pd.product_detail_model
            FROM PRODUCT_DETAILS as pd
            INNER JOIN PRODUCT_BRANDS as pb
                ON pd.product_brand_id = pb.product_brand_id
            """)

            data = [
                {
                    "brand": item[0],
                    "id": item[1],
                    "model": item[2]
                }
                for item in cursor.fetchall()
            ]

            return None, data
        except Exception:
            return f"Error al intentar obtener los modelos", None

    @staticmethod
    def create_product_details(details_data: ProductDetails):
        data = details_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor(buffered=True)

        try:
            cursor.execute(
                "SELECT product_details_id FROM PRODUCT_DETAILS WHERE product_detail_model = %s",
                (data["product_detail_model"],)
            )

            exist_model = cursor.fetchone()

            if exist_model:
                cursor.close()
                connection.close()
                return f"Este modelo ya esta registrado", False, None

            cursor.execute(
                """
                INSERT INTO PRODUCT_DETAILS (
                    product_brand_id,
                    product_detail_model,
                    product_detail_description
                ) VALUES (%s, %s, %s)
                """,
                (data["product_brand_id"], data["product_detail_model"],
                 data["product_detail_description"])
            )
            connection.commit()

            return None, True, f"Detalles del producto creado correctamente"
        except Exception:
            connection.rollback()
            return f"Error al crear el producto", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def update_product_details(details_data: UpdateProductDetails, cursor):
        data = details_data.model_dump()

        try:
            cursor.execute(
                """
                UPDATE PRODUCT_DETAILS SET
                    product_brand_id = %s
                WHERE product_details_id = %s
                """,
                (data["product_brand_id"], data["product_details_id"])
            )

            return None, True, "Detalles del producto actualizados correctamente"
        except Exception:
            return f"Error al actualizar los detalles", False, None
