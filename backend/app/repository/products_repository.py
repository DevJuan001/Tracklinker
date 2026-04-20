# Core
from app.core.database import get_connection
# Utils
from datetime import datetime
from dateutil.relativedelta import relativedelta
from app.utils.date_formatter import date_formatter
from app.utils.periods import period_map, daily_periods
# Models
from app.models.product_model import Product, UpdateProduct
from app.models.product_details_model import UpdateProductDetails
from app.models.product_serial_model import ProductSerial, UpdateProductSerial
# Repositories
from app.repository.product_details_repository import ProductDetailsRepository
from app.repository.product_serials_repository import ProductSerialsRepository


class ProductsRepository:

    @staticmethod
    def find_all_products(
        start_date: str = None,
        end_date: str = None,
        input_order: int = None,
        category_order: int = None,
        subcategory_order: int = None,
        warranty_time: int = None,
        product_status: int = None,
        brand: int = None,
        product_model: int = None,
    ):
        connection = get_connection()
        cursor = connection.cursor()

        query = """
        SELECT
            io.input_order_id,
            pd.product_detail_date,
            io.input_order_bill,
            c.category_name,
            sc.subcategory_id,
            sc.subcategory_name,
            p.product_id,
            s.supplier_name,
            ps.product_serial,
            pd.product_detail_model,
            pd.product_details_id,
            pd.product_detail_description,
            pb.product_brand_id,
            pb.product_brand_name,
            ps.product_garanty_input,
            p.product_status
            FROM SUPPLIERS AS s
            INNER JOIN INPUT_ORDERS AS io
            ON s.supplier_id = io.supplier_id
            INNER JOIN PRODUCT_SERIALS AS ps
            ON io.input_order_id = ps.input_order_id
            INNER JOIN PRODUCTS as p
            ON ps.product_id = p.product_id
            INNER JOIN SUBCATEGORIES AS sc
            ON p.subcategory_id = sc.subcategory_id
            INNER JOIN CATEGORIES AS c
            ON sc.category_id = c.category_id
            INNER JOIN PRODUCT_DETAILS AS pd
            ON p.product_details_id = pd.product_details_id
            INNER JOIN PRODUCT_BRANDS AS pb
            ON pd.product_brand_id = pb.product_brand_id
            """

        filters = []
        values = []

        if start_date:
            filters.append("DATE(pd.product_detail_date) >= %s")
            values.append(start_date)

        if end_date:
            filters.append("DATE(pd.product_detail_date) <= %s")
            values.append(end_date)

        if input_order:
            filters.append("io.input_order_id = %s")
            values.append(input_order)

        if category_order:
            filters.append("c.category_id = %s")
            values.append(category_order)

        if subcategory_order:
            filters.append("sc.subcategory_id = %s")
            values.append(subcategory_order)

        if warranty_time:
            garanty_time = (datetime.now() +
                            relativedelta(months=warranty_time)).date()
            filters.append("ps.product_garanty_input <= %s")
            values.append(garanty_time)

        if product_status:
            filters.append("p.product_status = %s")
            values.append(product_status)

        if brand:
            filters.append("pb.product_brand_id = %s")
            values.append(brand)

        if product_model:
            filters.append("pd.product_details_id")
            values.append(product_model)

        if filters:
            query += " WHERE " + " AND ".join(filters)

        try:
            cursor.execute(query, values)
            result = cursor.fetchall()
            # Mapeamos cada item que devuelve la query y le agregamos una llave para identificarlos
            data = [
                {
                    "input_order_id": item[0],
                    "input_date": date_formatter(item[1]),
                    "input_order": item[2],
                    "category": item[3],
                    "subcategory_id": item[4],
                    "subcategory": item[5],
                    "product_id": item[6],
                    "supplier": item[7],
                    "product_serial": item[8],
                    "model": item[9],
                    "product_details_id": item[10],
                    "description": item[11],
                    "brand_id": item[12],
                    "brand": item[13],
                    "warranty_time": item[14],
                    "status": item[15]
                }
                for item in result
            ]
            return None, data
        except Exception as e:
            return f"Error al ejecutar la consulta {e}", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_all_product_status():
        connection = get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
            SELECT DISTINCT
                product_status
            FROM PRODUCTS
            ORDER BY product_status ASC
            """)
            result = cursor.fetchall()

            data = [
                {
                    "id": item[0]
                }
                for item in result
            ]

            return None, data
        except Exception:
            return f"Error al intentar obtener los estados", None

    @staticmethod
    def create_product(product_data: Product):
        data = product_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor()

        try:
            cursor.execute("""
            INSERT INTO PRODUCTS (
                subcategory_id,
                product_details_id
            ) VALUES (%s, %s)""",
                           (data["subcategory_id"], data["product_details_id"]))
            connection.commit()

            product_id = cursor.lastrowid

            error, success, message = ProductSerialsRepository.create_product_serial(ProductSerial(
                product_serial=data["product_serial"],
                product_id=product_id,
                input_order_id=data["input_order_id"],
                product_garanty_input=data["product_garanty_input"]
            ))

            connection.commit()

            if error is not None or not success:
                # Eliminamos el producto insertado para evitar registros huérfanos
                try:
                    cursor.execute(
                        "DELETE FROM PRODUCTS WHERE product_id = %s", (product_id,))
                    connection.commit()
                except Exception:
                    pass
                return error, success, message

            return None, True, f"Producto creado correctamente"
        except Exception as e:
            return f"Error al crear el producto {e}", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def update_product(product_data: UpdateProduct):
        data = product_data.model_dump(exclude_none=True)

        PRODUCT_FIELD_MAP = {
            "subcategory": "subcategory_id",
            "status": "product_status",
            "model": "product_details_id",
        }

        connection = get_connection()
        cursor = connection.cursor()

        try:
            cursor.execute(
                "SELECT product_id FROM PRODUCTS WHERE product_id = %s",
                (data["id"],)
            )

            product = cursor.fetchone()

            if not product:
                return "Producto no encontrado", False, None

            # Solo actualiza details si vino brand o model
            details_fields = {
                key: data[key]
                for key in ["brand", "model"]
                if key in data
            }
            
            if details_fields:
                error, success, message = ProductDetailsRepository.update_product_details(
                    UpdateProductDetails(**details_fields), cursor
                )
                if error is not None or not success:
                    return error, success, message

            # Solo actualiza serial si vino alguno de estos campos
            serial_fields = {
                key: data[key]
                for key in ["serial", "input_order", "warranty_time"]
                if key in data
            }

            if serial_fields:
                error, success, message = ProductSerialsRepository.update_product_serial(
                    UpdateProductSerial(
                        id=data["id"], **serial_fields), cursor
                )
                if error is not None or not success:
                    return error, success, message

            # Campos de PRODUCTS — traduce con el mapa antes de construir el query
            product_fields = {key: data[key]
                              for key in ["subcategory", "status", "model"] if key in data}
            if product_fields:
                mapped = {
                    PRODUCT_FIELD_MAP[key]: value for key, value in product_fields.items()}

                columns = ", ".join(f"{col} = %s" for col in mapped.keys())
                values = list(mapped.values()) + [data["id"]]

                cursor.execute(
                    f"UPDATE PRODUCTS SET {columns} WHERE product_id = %s",
                    values
                )

            connection.commit()
            return None, True, f"Producto actualizado correctamente"

        except Exception as e:
            connection.rollback()
            return f"Error al intentar actualizar el producto {e}", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def update_product_status(product_data: dict):
        connection = get_connection()
        cursor = connection.cursor()

        try:
            cursor.execute(
                "SELECT product_status FROM PRODUCTS WHERE product_id = %s",
                (product_data["product_id"],)
            )

            product = cursor.fetchone()

            if not product:
                cursor.close()
                connection.close()
                return "Producto no encontrado", False, None

            if product[0] == 0 and (product_data["product_status"] == 2 or product_data["product_status"] == 3):
                cursor.close()
                connection.close()
                return f"No puedes vender o crear una garantía con un producto deshabilitado", False, None

            cursor.execute("""
                UPDATE PRODUCTS SET
                    product_status = %s
                WHERE product_id = %s
                """, (product_data["product_status"], product_data["product_id"])
            )

            connection.commit()

            return None, True, f"Estado del producto actualizado correctamente"
        except Exception:
            connection.rollback()
            return f"Error al intentar actualizar el estado del producto", False, None
        finally:
            cursor.close()
            connection.close()

#   ------------ REPORTES DE PRODUCTOS ------------

    @staticmethod
    def find_recent_products():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            pd.product_detail_date,
            ps.product_serial,
            pd.product_detail_model,
            pb.product_brand_name,
            p.product_status
        FROM PRODUCT_SERIALS as ps
        INNER JOIN PRODUCTS as p
        ON ps.product_id = p.product_id
        INNER JOIN PRODUCT_DETAILS as pd
        ON p.product_details_id = pd.product_details_id
        INNER JOIN PRODUCT_BRANDS as pb
        ON pd.product_brand_id = pb.product_brand_id
        ORDER BY MONTH(pd.product_detail_date) DESC
        LIMIT 6
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()
            data = [
                {
                    "input_date": date_formatter(item["product_detail_date"]),
                    "serial": item["product_serial"],
                    "model": item["product_detail_model"],
                    "brand": item["product_brand_name"],
                    "status": item["product_status"]
                }
                for item in results
            ]
            return None, data
        except Exception:
            return f"Error al ejecutar la consulta:", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_products_by_status():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            (SELECT COUNT(*)
            FROM PRODUCT_SERIALS
            WHERE product_garanty_input >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            ) AS recent_products,

            (SELECT COUNT(*)
            FROM PRODUCT_SERIALS
            ) AS total_products,    

            (SELECT COUNT(DISTINCT product_serial)
            FROM WARRANTY_INCIDENTS
            ) AS warranties_products,

            (SELECT COUNT(DISTINCT product_id)
            FROM PRODUCTS
            WHERE product_status = 3
            ) AS sold_products;
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()
            return None, results
        except Exception:
            return f"Error al ejecutar la consulta:", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_products_growth(period: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        if period not in period_map:
            period = "30d"

        interval = period_map.get(period, "30 DAY")
        use_daily = period in daily_periods

        if use_daily:
            group_expr = "DATE(pd.product_detail_date)"
            select_expr = "DATE(pd.product_detail_date) as label"
        else:
            group_expr = "DATE_FORMAT(pd.product_detail_date, '%Y-%m')"
            select_expr = "DATE_FORMAT(pd.product_detail_date, '%Y-%m') as label"

        query = f"""
        SELECT
            {select_expr},
            COUNT(DISTINCT ps.product_serial) as products
        FROM PRODUCT_SERIALS as ps
        INNER JOIN INPUT_ORDERS as io
            ON ps.input_order_id = io.input_order_id
        INNER JOIN PRODUCTS as p
            ON ps.product_id = p.product_id
        INNER JOIN PRODUCT_DETAILS as pd
            ON p.product_details_id = pd.product_details_id
        WHERE pd.product_detail_date >= DATE_SUB(NOW(), INTERVAL {interval})
        GROUP BY {group_expr}
        ORDER BY {group_expr} ASC
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()
            return None, results
        except Exception:
            return f"Error al ejecutar la consulta:", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_products_by_brand(period: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        interval = period_map.get(period, "30 DAY")

        query = f"""
        SELECT
            pb.product_brand_name,
            COUNT(DISTINCT p.product_id) as products
        FROM PRODUCTS as p
        INNER JOIN PRODUCT_DETAILS as pd
            ON p.product_details_id = pd.product_details_id
        INNER JOIN PRODUCT_BRANDS as pb
            ON pd.product_brand_id = pb.product_brand_id
        WHERE pd.product_detail_date >= DATE_SUB(NOW(), INTERVAL {interval})
        GROUP BY pb.product_brand_name
        ORDER BY pb.product_brand_name ASC
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()

            data = [
                {
                    "name": item["product_brand_name"],
                    "value": item["products"]
                }
                for item in results
            ]
            return None, data
        except Exception:
            return f"Error al ejecutar la consulta:", None
        finally:
            cursor.close()
            connection.close()
