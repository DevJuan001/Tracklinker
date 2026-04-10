from app.core.database import get_connection
from app.models.guarantiees_model import Guarantee
from app.utils.date_formatter import date_formatter
from app.utils.periods import period_map, daily_periods
from app.repository.products_repository import ProductsRepository
from datetime import datetime
from fastapi import HTTPException


class GuaranteeRepository:

    @staticmethod
    def find_all_guarantiee():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            warranty_incidents_id,
            product_serial,
            warranty_customer,
            warranty_customer,
            warranty_phone,
            warranty_address,
            warranty_description,
            warranty_link_attachments,
            warranty_city,
            warranty_date,
            warranty_status
        FROM WARRANTY_INCIDENTS
        ORDER BY warranty_incidents_id DESC
        """
        try:
            cursor.execute(query)
            results = cursor.fetchall()
            data = [
                {
                    "warranty_incidents_id": item["warranty_incidents_id"],
                    "product_serial": item["product_serial"],
                    "warranty_customer": item["warranty_customer"],
                    "warranty_phone": item["warranty_phone"],
                    "warranty_address": item["warranty_address"],
                    "warranty_description": item["warranty_description"],
                    "warranty_link_attachments": item["warranty_link_attachments"],
                    "warranty_city": item["warranty_city"],
                    "warranty_date": date_formatter(item["warranty_date"]),
                    "warranty_status": item["warranty_status"]
                }
                for item in results
            ]
            return None, data
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
        finally:
            cursor.close()
            connection.close()

    # Obtener una incidencia por ID
    @staticmethod
    def find_by_id(warranty_incidents_id: int):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Petición a la base de datos
        query = """
        SELECT * FROM WARRANTY_INCIDENTS WHERE warranty_incidents_id = %s
        """
        try:
            cursor.execute(query, (warranty_incidents_id,))
            result = cursor.fetchall()
            return None, result
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def create(warranty_data: Guarantee):

        data = warranty_data.model_dump()

        connection = get_connection()
        cursor = connection.cursor()

        # Petición a la base de datos
        query = """
        INSERT INTO WARRANTY_INCIDENTS (
            product_serial,
            warranty_customer,
            warranty_phone,
            warranty_address,
            warranty_description,
            warranty_link_attachments,
            warranty_city
        ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        try:
            cursor.execute("""
            SELECT 
                product_id
            FROM PRODUCT_SERIALS WHERE product_serial = %s
            """, (data["product_serial"],))

            product_id = cursor.fetchone()

            error, success, message = ProductsRepository.update_product_status(
                {"product_id": product_id[0], "product_status": 3})

            if error:
                raise HTTPException(status_code=500, detail=error)

            cursor.execute(query, (
                data["product_serial"],
                data["warranty_customer"],
                data["warranty_phone"],
                data["warranty_address"],
                data["warranty_description"],
                data["warranty_link_attachments"],
                data["warranty_city"],
            ))
            connection.commit()

            return None, True, "Incidencia creado correctamente"
        except Exception as e:
            connection.rollback()
            return f"Error al ejecutar la consulta: {e}", None, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def update(warranty_incidents_id: int, warranty_data: dict):
        data = warranty_data.model_dump()

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        UPDATE WARRANTY_INCIDENTS SET
            warranty_customer = %s,
            warranty_phone = %s,
            warranty_address = %s,
            warranty_description = %s,
            warranty_link_attachments = %s,
            warranty_city = %s,
            warranty_status = %s
        WHERE warranty_incidents_id = %s"""

        try:
            cursor.execute(query, (
                data["warranty_customer"],
                data["warranty_phone"],
                data["warranty_address"],
                data["warranty_description"],
                data["warranty_link_attachments"],
                data["warranty_city"],
                data["warranty_status"],
                warranty_incidents_id
            ))

            connection.commit()
            return None, True, "Incidencia actualizada correctamente"
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def delete(warranty_incidents_id: int):
        connection = get_connection()
        cursor = connection.cursor()
        query = """
        DELETE FROM WARRANTY_INCIDENTS WHERE warranty_incidents_id = %s
        """
        try:
            cursor.execute(query, (warranty_incidents_id,))
            connection.commit()
            return None, True, "Incidencia eliminada correctamente"
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_disabled_guarantees():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT * FROM WARRANTY_INCIDENTS
        WHERE is_active = FALSE
        ORDER BY WARRANTY_INCIDENTS_ID DESC
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


#   ------------ REPORTES DE GARANTÍAS ------------


    @staticmethod
    def find_recent_warranties():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            product_serial,
            warranty_customer,
            warranty_description,
            warranty_date,
            warranty_status
        FROM WARRANTY_INCIDENTS as c
        ORDER BY warranty_incidents_id DESC
        LIMIT 6
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()
            data = [
                {
                    "serial": item["product_serial"],
                    "customer": item["warranty_customer"],
                    "description": item["warranty_description"],
                    "date": date_formatter(item["warranty_date"]),
                    "status": item["warranty_status"],
                }
                for item in results
            ]
            return None, data
        except Exception as e:
            return f"Error al ejecutar la consulta", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_warranties_by_brand(period: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        interval = period_map.get(period, "30 DAY")

        query = f"""
        SELECT
            pb.product_brand_name,
            COUNT(DISTINCT wi.warranty_incidents_id) as warranties
        FROM WARRANTY_INCIDENTS AS wi
        INNER JOIN OUTPUT_DETAILS AS od
            ON wi.product_serial = od.product_serial
        INNER JOIN PRODUCT_SERIALS AS ps
            ON od.product_serial = ps.product_serial
        INNER JOIN PRODUCTS AS p
            ON ps.product_id = p.product_id
        INNER JOIN PRODUCT_DETAILS AS pd
            ON p.product_details_id = pd.product_details_id
        INNER JOIN PRODUCT_BRANDS AS pb
            ON pd.product_brand_id = pb.product_brand_id
        WHERE wi.warranty_date >= DATE_SUB(NOW(), INTERVAL {interval})
        GROUP BY pb.product_brand_name
        ORDER BY pb.product_brand_name ASC
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()

            data = [
                {
                    "name": item["product_brand_name"],
                    "value": item["warranties"]
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
    def find_warranties_by_status():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            (SELECT COUNT(*) FROM WARRANTY_INCIDENTS) AS total_warranties,
            SUM(CASE WHEN warranty_status = 0 THEN 0 ELSE 0 END) AS without_make_warranties,
            SUM(CASE WHEN warranty_status = 1 THEN 1 ELSE 0 END) AS inprocess_warranties,
            SUM(CASE WHEN warranty_status = 2 THEN 1 ELSE 0 END) AS complete_warranties
        FROM WARRANTY_INCIDENTS
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
    def find_warranties_growth(period: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        if period not in period_map:
            period = "30d"

        interval = period_map.get(period, "30 DAY")
        use_daily = period in daily_periods

        if use_daily:
            group_expr = "DATE(warranty_date)"
            select_expr = "DATE(warranty_date) as label"
        else:
            group_expr = "DATE_FORMAT(warranty_date, '%Y-%m')"
            select_expr = "DATE_FORMAT(warranty_date, '%Y-%m') as label"

        query = f"""
        SELECT
            {select_expr},
            COUNT(DISTINCT warranty_incidents_id) as warranties
        FROM WARRANTY_INCIDENTS
        WHERE warranty_date >= DATE_SUB(NOW(), INTERVAL {interval})
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
