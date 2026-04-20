from app.models.product_serial_model import ProductSerial, UpdateProductSerial
from datetime import datetime
from dateutil.relativedelta import relativedelta
from app.core.database import get_connection


class ProductSerialsRepository:

    @staticmethod
    def create_product_serial(serial_data: ProductSerial):
        data = serial_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor()
        try:
            garanty_time = None

            if data["product_garanty_input"] is not None:
                garanty_time = datetime.now(
                ) + relativedelta(months=data["product_garanty_input"])

            cursor.execute("""
            SELECT product_id FROM PRODUCT_SERIALS WHERE product_serial = %s 
            """, (data["product_serial"],))

            if cursor.fetchone():
                cursor.close()
                connection.close()
                return f"Este serial ya esta registrado", False, None

            cursor.execute("""
            INSERT INTO PRODUCT_SERIALS(
                product_serial,
                product_id,
                input_order_id,
                product_garanty_input
            ) VALUES (%s, %s, %s, %s)
            """,
                           (
                               data["product_serial"],
                               data["product_id"],
                               data["input_order_id"],
                               garanty_time
                           ))

            connection.commit()

            return None, True, f"Serial del producto creado correctamente"
        except Exception as e:
            return f"Error al crear el serial del producto {e}", False, None

    @staticmethod
    def update_product_serial(serial_data: UpdateProductSerial, cursor):
        SERIAL_FIELD_MAP = {
            "serial":       "product_serial",
            "input_order":  "input_order_id",
            "warranty_time": "product_garanty_input",
        }

        data = serial_data.model_dump(exclude_none=True)
        data.pop("id", None)

        if not data:
            return None, True, None

        # Mapea los nombres del request a los nombres reales de la tabla
        mapped = {SERIAL_FIELD_MAP[k]: v for k, v in data.items()}

        columns = ", ".join(f"{col} = %s" for col in mapped.keys())
        values = list(mapped.values()) + [serial_data.id]

        if not data:
            return None, True, None

        try:
            cursor.execute(
                f"UPDATE PRODUCT_SERIALS SET {columns} WHERE product_id = %s",
                values
            )

            return None, True, f"Serial del producto actualizado correctamente"
        except Exception:
            return f"Error al actualizar el serial del producto", False, None
