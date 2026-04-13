from app.core.database import get_connection
from app.models.category_model import CategoryUpdate
from app.utils.date_formatter import date_formatter
from app.utils.periods import period_map, daily_periods

class CategoryRepository:

    # Obtener todas las categorias
    @staticmethod
    def find_all_categories(
        name_order: str = None,
        start_date: str = None,
        end_date: str = None,
        status: int = None,
    ):

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT 
            category_id,
            category_name,
            category_description,
            category_date,
            category_status
        FROM CATEGORIES"""

        filters = []
        values = []

        if start_date:
            filters.append("DATE(category_date) >= %s")
            values.append(start_date)

        if end_date:
            filters.append("DATE(category_date) <= %s")
            values.append(end_date)

        if name_order == "asc":
            query += " ORDER BY category_name ASC"
        elif name_order == "desc":
            query += " ORDER BY category_name DESC"

        if status:
            filters.append("category_status = %s")
            values.append(status)
        
        if filters:
            query += " WHERE " + " AND ".join(filters)

        try:
            cursor.execute(query, values)
            result = cursor.fetchall()
            data = [
                {
                    "category_id": item["category_id"],
                    "category_name": item["category_name"],
                    "category_description": item["category_description"],
                    "category_date": date_formatter(item["category_date"]),
                    "category_status": item["category_status"]
                }
                for item in result
            ]
            return None, data
        except Exception:
            return f"Error al ejecutar la consulta", None
        finally:
            cursor.close()
            connection.close()

    # Obtener una categoria por el ID
    @staticmethod
    def find_by_id(category_id: int):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM categories WHERE category_id = %s"

        try:
            cursor.execute(query, (category_id,))
            result = cursor.fetchone()
            return None, result
        except Exception:
            return f"Error al ejecutar la consulta", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def create(category_data: dict):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        try:
            # Validar nombre duplicado
            cursor.execute(
                "SELECT COUNT(*) as count FROM categories WHERE category_name = %s", (category_data["name"],))
            count_result = cursor.fetchone()

            if count_result["count"] > 0:
                cursor.close()
                connection.close()
                return "La categoría ya existe", None, None

            query = "INSERT INTO categories (category_name, category_description) VALUES (%s, %s)"

            cursor.execute(query, (category_data["name"], category_data["description"]))
            connection.commit()

            return None, True, "Categoría creada correctamente"

        except Exception:
            connection.rollback()
            return f"Error al ejecutar la consulta", None, None

        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def update(category_id: int, category_data: CategoryUpdate):
        data = category_data.model_dump()

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Verificar si existe la categoría
        cursor.execute(
            "SELECT * FROM categories WHERE category_id = %s", (category_id,))
        category = cursor.fetchone()

        if not category:
            cursor.close()
            connection.close()
            return "Categoría no encontrada", None, None

        if not category_data:
            cursor.close()
            connection.close()
            return "No se proporcionaron datos para actualizar", None, None

        query = """
        UPDATE CATEGORIES SET
            category_name = %s,
            category_description = %s
        WHERE category_id = %s"""

        try:
            cursor.execute(query, (
                data["name"],
                data["description"],
                category_id,
                ))
            connection.commit()

            return None, True, "Categoría actualizada correctamente"

        except Exception:
            connection.rollback()
            return f"Error al ejecutar la consulta", None, None

        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def disable(category_id: int):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            "SELECT * FROM CATEGORIES WHERE category_id = %s", (category_id,))
        category = cursor.fetchone()
        if not category:
            cursor.close()
            connection.close()
            return "Categoría no encontrada", False, None

        query = """
        UPDATE CATEGORIES SET
            category_status = 1
        WHERE category_id = %s"""

        try:
            cursor.execute(query, (category_id,))
            connection.commit()
            return None, True, "Categoría deshabilitada correctamente"
        except Exception:
            return f"Error al intentar ejecutar la consulta", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def enable(category_id: int):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            "SELECT * FROM CATEGORIES WHERE category_id = %s", (category_id,))
        category = cursor.fetchone()
        if not category:
            cursor.close()
            connection.close()
            return "Categoría no encontrada", False, None

        query = """
        UPDATE CATEGORIES SET
            category_status = 2
        WHERE category_id = %s"""

        try:
            cursor.execute(query, (category_id,))
            connection.commit()
            return None, True, "Categoría habilitada correctamente"
        except Exception:
            return f"Error al intentar ejecutar la consulta", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_categories_by_date_range(start_date: str, end_date: str):
        connection  = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM CATEGORIES WHERE CATEGORY_DATE BETWEEN %s AND %s"

        try:
            cursor.execute(query, (start_date, end_date))
            result = cursor.fetchall()
            return None, result
        except Exception:
            return f"Error al ejecutar la consulta", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_deleted_categories_by_date_range(start_date: str, end_date: str):
        connection  = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM CATEGORIES WHERE DELETION_DATE BETWEEN %s AND %s"

        try:
            cursor.execute(query, (start_date, end_date))
            result = cursor.fetchall()
            return None, result
        except Exception:
            return f"Error al ejecutar la consulta", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_disabled_categories():
        connection  = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = "SELECT * FROM CATEGORIES WHERE STATUS = 'DISABLED'"

        try:
            cursor.execute(query)
            result = cursor.fetchall()
            return None, result
        except Exception:
            return f"Error al ejecutar la consulta", None
        finally:
            cursor.close()
            connection.close()

#   ------------ REPORTES DE CATEGORIAS ------------


    @staticmethod
    def find_recent_categories():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            category_name,
            category_date,
            category_description,
            category_status
        FROM CATEGORIES
        ORDER BY category_id DESC
        LIMIT 6
        """

        try:
            cursor.execute(query)
            results = cursor.fetchall()
            data = [
                {
                    "name": item["category_name"],
                    "date": date_formatter(item["category_date"]),
                    "description": item["category_description"],
                    "status": item["category_status"],
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
    def find_categories_by_status():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            (SELECT COUNT(*)
            FROM CATEGORIES
            WHERE category_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            ) AS recent_categories,
            (SELECT COUNT(*) FROM CATEGORIES) AS total_categories,
            SUM(CASE WHEN category_status = 0 THEN 1 ELSE 0 END) AS inactive_categories,
            SUM(CASE WHEN category_status = 1 THEN 1 ELSE 0 END) AS active_categories
        FROM CATEGORIES
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
    def find_categories_growth(period: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        if period not in period_map:
            period = "30d"

        interval = period_map.get(period, "30 DAY")
        use_daily = period in daily_periods

        if use_daily:
            group_expr = "DATE(category_date)"
            select_expr = "DATE(category_date) as label"
        else:
            group_expr = "DATE_FORMAT(category_date, '%Y-%m')"
            select_expr = "DATE_FORMAT(category_date, '%Y-%m') as label"

        query = f"""
        SELECT
            {select_expr},
            COUNT(DISTINCT category_id) as categories
        FROM CATEGORIES
        WHERE category_date >= DATE_SUB(NOW(), INTERVAL {interval})
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