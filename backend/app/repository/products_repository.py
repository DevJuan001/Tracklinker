from app.core.database import get_connection
from app.models.product_model import Product
from app.utils.date_formatter import date_formatter
from app.models.product_details_model import ProductDetails
from app.models.product_serial_model import ProductSerial
from app.models.input_order_model import InputOrder
from app.models.product_brand_model import ProductBrand
from app.utils.periods import period_map, daily_periods

class ProductsRepository:

    @staticmethod
    def find_all_products():
        connection = get_connection()
        cursor = connection.cursor()

        query = "SELECT * FROM get_all_products"

        try:
            cursor.execute(query)
            result = cursor.fetchall()
            # Mapeamos cada item que devuelve la query y le agregamos una llave para identificarlos
            data = [
                {
                    "input_order_id": item[0],
                    "input_date": date_formatter(item[1]),
                    "input_order": item[2],
                    "category": item[3],
                    "subcategory": item[4],
                    "product_id": item[5],
                    "supplier": item[6],
                    "product_serial": item[7],
                    "model": item[8],
                    "product_details_id": item[9],
                    "description": item[10],
                    "brand": item[11],
                    "warranty_time": item[12]
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
    def find_all_input_orders():
        connection = get_connection()
        cursor = connection.cursor()

        query = "SELECT input_order_id, input_order_bill FROM INPUT_ORDERS"

        try:
            cursor.execute(query)
            result = cursor.fetchall()
            data = [
                {
                    "id": item[0],
                    "bill": item[1]
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
    def find_all_and_new_products_ammount():
        connection = get_connection()
        cursor = connection.cursor()

        query = """
        SELECT 
            (SELECT COUNT(*) FROM PRODUCTS) AS total,
            (SELECT COUNT(*) 
            FROM PRODUCTS AS p
            INNER JOIN PRODUCT_SERIALS AS ps
            ON p.product_id = ps.product_id
            INNER JOIN INPUT_ORDERS AS io
            ON ps.input_order_id = io.input_order_id
            WHERE MONTH(io.input_order_date) = MONTH(CURDATE())
            AND YEAR(io.input_order_date) = YEAR(CURDATE())
            ) AS new_products;"""

        try:
            cursor.execute(query)
            result = cursor.fetchall()

            data = [
                {
                    "products": item[0],
                    "new_products": item[1]
                }
                for item in result
            ]

            return None, data
        except Exception as e:
            return f"Error al ejecutar la consulta {e}", None
        finally:
            connection.close()
            cursor.close()

    @staticmethod
    def find_products_out_of_stock():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT * FROM PRODUCTS
        WHERE stock = 0
        ORDER BY product_id DESC"""
        try:
            cursor.execute(query)
            results = cursor.fetchall()
            return None, results
        except Exception as e:
            return f"❌ Error al ejecutar la consulta: {e}", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_all_product_brands():
        connection = get_connection()
        cursor = connection.cursor()

        query = "SELECT product_brand_id, product_brand_name FROM PRODUCT_BRANDS"

        try:
            cursor.execute(query)
            result = cursor.fetchall()
            data = [
                {
                    "id": item[0],
                    "name": item[1]
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
    def find_all_product_models():
        connection = get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
            SELECT 
                product_details_id,
                product_detail_model
            FROM PRODUCT_DETAILS
            """)

            data = [
                {
                    "id": item[0],
                    "model": item[1]
                }
                for item in cursor.fetchall()
            ]

            return None, data
        except Exception as e:
            return f"Error al intentar obtener los modelos", None

    @staticmethod
    def create_product_details(details_data: ProductDetails):
        data = details_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute(
                """
                INSERT INTO PRODUCT_DETAILS (
                    product_brand_id,
                    product_detail_model,
                    product_detail_description
                ) VALUES (%s, %s, %s)
                """,
                (data["product_brand_id"], data["product_model"], data["product_model"])
            )
            connection.commit()
            return None, True, f"Detalles del producto creado correctamente"
        except Exception as e:
            return f"Error al crear el producto {e}", False, None
        
    @staticmethod
    def create_product_serial(serial_data: ProductSerial):
        data = serial_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
            INSERT INTO PRODUCT_SERIALS(
                product_serial,
                product_id,
                input_order_id,
                product_garanty_input
            ) VALUES (%s, %s, %s, %s)
            """,
            (data["product_serial"], data["product_id"], data["input_order_id"], data["product_garanty_input"]))
            connection.commit()
            return None, True, f"Serial del producto creado correctamente"
        except Exception as e:
            return f"Error al crear el serial del producto {e}", False, None

    @staticmethod
    def create_product_brand(brand_data: ProductBrand):
        data = brand_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO PRODUCT_BRANDS (product_brand_name) VALUES (%s)",
                (data["product_brand"],))
            connection.commit()
            return None, True, f"Marca creada correctamente"
        except Exception as e:
            return f"Error al crear la marca {e}", False, None
    
    @staticmethod
    def create_input_order(input_order_data: InputOrder):
        data = input_order_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
            INSERT INTO INPUT_ORDERS(
                input_order_bill,
                supplier_id
            ) VALUES (%s, %s)
            """, (data["input_order_bill"], data["supplier_id"]))
            connection.commit()
            return None, True, f"Orden de entrada creada correctamente"
        except Exception as e:
            return f"Error al crear la orden de entrada {e}", False, None
    
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

            error, success, message = ProductsRepository.create_product_serial(ProductSerial(
                product_serial=data["product_serial"],
                product_id=product_id,
                input_order_id=data["input_order_id"],
                product_garanty_input=data["product_garanty_input"]
            ))
            
            if error is not None or not success:
                # Eliminamos el producto insertado para evitar registros huérfanos
                try:
                    cursor.execute("DELETE FROM PRODUCTS WHERE product_id = %s", (product_id,))
                    connection.commit()
                except Exception:
                    pass
                return f"Error al crear el producto {error}", False, None

            return None, True, f"Producto creado correctamente"
        except Exception as e:
            return f"Error al crear el producto {e}", False, None
        finally:
            cursor.close()
            connection.close()

    def update_product(product_id: int, product_data: dict):
        data = product_data.model_dump()
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            "SELECT product_id FROM PRODUCTS WHERE product_id = %s",
            (product_id,)
        )
        connection.commit()
        product = cursor.fetchone()

        if not product:
            cursor.close()
            connection.close()
            return "Producto no encontrado", None, None

        try:
            cursor.execute("""
            UPDATE PRODUCTS SET
                product_
            WHERE proudct_id = %s
            """, (product_id)
            )
            return None, True, f"Producto actualizado correctamente"
        except Exception as e:
            return f"Error al intentar actualizar el producto {e}", False, None
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
            pb.product_brand_name
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
                    "brand": item["product_brand_name"]
                }
                for item in results
            ]
            return None, data
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
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

            (SELECT COUNT(DISTINCT product_serial)
            FROM OUTPUT_DETAILS
            ) AS transformations_products;
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()
            return None, results
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
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
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
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
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
        finally:
            cursor.close()
            connection.close()