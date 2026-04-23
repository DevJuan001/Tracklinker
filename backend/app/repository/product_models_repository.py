from app.core.database import get_connection


class ProductModelsRepository:

    @staticmethod
    def create_product_model(model_data):
        data = model_data.model_dump()

        connection = get_connection()
        cursor = connection.cursor(buffered=True)

        try:
            cursor.execute(
                """
                INSERT INTO PRODUCT_MODELS (
                    product_brand_id,
                    product_model_description
                ) VALUES (%s, %s)
                """,
                (data["brand"], data["model"])
            )
            connection.commit()

            return None, True, "Detalles del producto creado correctamente"
        except Exception:
            connection.rollback()
            return "Error al crear el producto", False, None
        finally:
            cursor.close()
            connection.close()
