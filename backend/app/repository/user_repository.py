from app.core.database import get_connection
from app.models.user_model import User, UpdateUser, UpdateCurrentUser
from app.utils.date_formatter import date_formatter
from app.utils.periods import period_map, daily_periods
import bcrypt


class UserRepository:

    # Obtener todos los usuarios
    @staticmethod
    def find_all_users(
        role_order: int = None,
        name_order: str = None,
        start_date: str = None,
        end_date: str = None,
        status: int = None,
    ):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Petición a la base de datos
        query = """
        SELECT
            r.rol_name,
            r.rol_id,
            u.user_id,
            u.user_name,
            u.user_first_surname,
            u.user_second_surname,
            u.user_phone,
            u.user_email,
            u.user_address,
            u.user_city,
            u.user_date,
            u.user_status
        FROM USERS AS u 
        INNER JOIN ROLES AS r 
            ON u.rol_id = r.rol_id
        """

        filters = []
        values = []

        if role_order:
            filters.append("r.rol_id = %s")
            values.append(role_order)

        if start_date:
            filters.append("DATE(u.user_date) >= %s")
            values.append(start_date)

        if end_date:
            filters.append("DATE(u.user_date) <= %s")
            values.append(end_date)

        if name_order == "asc":
            query += " ORDER BY u.user_name ASC"
        elif name_order == "desc":
            query += " ORDER BY u.user_name DESC"

        if status:
            filters.append("u.user_status = %s")
            values.append(status)

        if filters:
            query += " WHERE " + " AND ".join(filters)

        try:
            cursor.execute(query, values)
            results = cursor.fetchall()
            data = [
                {
                    "rol_id": item["rol_id"],
                    "rol_name": item["rol_name"],
                    "id": item["user_id"],
                    "name": item["user_name"],
                    "first_surname": item["user_first_surname"],
                    "second_surname": item["user_second_surname"],
                    "phone": item["user_phone"],
                    "email": item["user_email"],
                    "address": item["user_address"],
                    "city": item["user_city"],
                    "date": date_formatter(item["user_date"]),
                    "status": item["user_status"]
                }
                for item in results
            ]
            return None, data
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
        finally:
            cursor.close()
            connection.close()

    # Obtener un usuario por el ID
    @staticmethod
    def find_by_id(user_id: int):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Petición a la base de datos
        query = """
        SELECT
            rol_name,
            user_name,
            user_first_surname,
            user_second_surname,
            user_password,
            user_phone,
            user_email,
            user_address,
            user_city
        FROM USERS as u
        INNER JOIN ROLES as r
            ON u.rol_id = r.rol_id
        WHERE user_id = %s
        """

        try:
            cursor.execute(query, (user_id,))
            result = cursor.fetchall()

            if not result:
                return "Usuario no encontrado", None

            data = [
                {
                    "role": item["rol_name"],
                    "name": item["user_name"],
                    "first_surname": item["user_first_surname"],
                    "second_surname": item["user_second_surname"],
                    "user_password": item["user_password"],
                    "phone": item["user_phone"],
                    "email": item["user_email"],
                    "address": item["user_address"],
                    "city": item["user_city"]
                }
                for item in result
            ]
            return None, data
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_user_password_by_id(user_id: int):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Petición a la base de datos
        query = """
        SELECT
            user_password
        FROM USERS
        WHERE user_id = %s
        """

        try:
            cursor.execute(query, (user_id,))
            result = cursor.fetchall()

            if not result:
                return "Usuario no encontrado", None

            return None, result
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None
        finally:
            cursor.close()
            connection.close()

    # Obtener un usuario mediante el correo
    @staticmethod
    def find_by_email(user_email: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Petición a la base de datos
        query = """
        SELECT
            r.rol_name,
            u.user_id,
            u.user_name,
            u.user_first_surname,
            u.user_second_surname,
            u.user_email, 
            u.user_password
        FROM USERS AS u 
        INNER JOIN ROLES AS r 
        ON r.rol_id = u.rol_id 
        WHERE u.user_email = %s AND u.user_status = 2
        """

        try:
            cursor.execute(query, (user_email,))
            result = cursor.fetchone()
            return result
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}"
        finally:
            cursor.close()
            connection.close()

    # Obtener todas las ciudades

    @staticmethod
    def find_all_cities():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Petición a la base de datos
        query = """
        SELECT
            city_id as id,
            city_name as name
        FROM CITIES
        """

        try:
            cursor.execute(query)
            result = cursor.fetchall()

            return None, result
        except Exception:
            return f"Error al ejecutar la consulta", None
        finally:
            cursor.close()
            connection.close()

    # Crear un usuario
    @staticmethod
    def create(user_data: User, temporal_password: str):
        data = user_data.model_dump()

        connection = get_connection()
        cursor = connection.cursor()

        # Validar email duplicado
        cursor.execute(
            "SELECT user_id FROM USERS WHERE user_email = %s", (data["email"],))
        if cursor.fetchone():
            cursor.close()
            connection.close()
            return None, False, "El correo ya está registrado"

        # Hashear la contraseña
        password = temporal_password.encode("utf-8")
        hash_password = bcrypt.hashpw(
            password, bcrypt.gensalt(rounds=12)).decode("utf-8")

        # Petición a la base de datos
        query = """INSERT INTO USERS (
            rol_id,
            user_name,
            user_first_surname,
            user_second_surname,
            user_address,
            user_city,
            user_password,
            user_email,
            user_phone
        ) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"""

        try:
            cursor.execute(query, (
                data["rol_id"],
                data["name"],
                data["first_surname"],
                data["second_surname"],
                data["address"],
                data["city"],
                hash_password,
                data["email"],
                data["phone"]))
            connection.commit()
            return None, True, "Usuario creado correctamente"
        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None, None
        finally:
            cursor.close()
            connection.close()

    # Actualizar la información de un usuario
    @staticmethod
    def update(user_id: int, user_data: UpdateUser):
        data = user_data.model_dump()

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Verificar si existe el usuario
        cursor.execute("SELECT * FROM USERS WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            cursor.close()
            connection.close()
            return "Usuario no encontrado", None, None

        # Verificar si existe el correo y no duplicarlo
        if "user_email" in user_data:
            cursor.execute(
                "SELECT user_id FROM USERS WHERE user_email = %s", (user_data["user_email"],))
            existing = cursor.fetchone()

            if existing and existing["user_id"] != user_id:
                cursor.close()
                connection.close()
                return None, False, "El correo ya está registrado"

        query = """
        UPDATE USERS SET
            user_name = %s,
            user_first_surname = %s,
            user_second_surname = %s,
            user_email = %s,
            user_phone = %s,
            user_city = %s,
            user_address = %s,
            user_status = %s
        WHERE user_id = %s"""

        try:
            cursor.execute(query, (
                data["name"],
                data["first_surname"],
                data["second_surname"],
                data["email"],
                data["phone"],
                data["city"],
                data["address"],
                data["status"],
                user_id
            ))
            connection.commit()

            return None, True, "Usuario actualizado correctamente"
        except Exception as e:
            connection.rollback()
            return f"Error al ejecutar la consulta: {e}", False, None
        finally:
            cursor.close()
            connection.close()

    # Actualizar la información de un usuario

    @staticmethod
    def update_current_user(user_id: int, user_data: UpdateCurrentUser):
        data = user_data.model_dump()

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Verificar si existe el usuario
        cursor.execute("SELECT * FROM USERS WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            cursor.close()
            connection.close()
            return "Usuario no encontrado", None, None

        # Verificar si existe el correo y no duplicarlo
        if "user_email" in user_data:
            cursor.execute(
                "SELECT user_id FROM USERS WHERE user_email = %s", (user_data["user_email"],))
            existing = cursor.fetchone()

            if existing and existing["user_id"] != user_id:
                cursor.close()
                connection.close()
                return None, False, "El correo ya está registrado"

        query = """
        UPDATE USERS SET
            user_name = %s,
            user_first_surname = %s,
            user_second_surname = %s,
            user_email = %s,
            user_phone = %s,
            user_city = %s,
            user_address = %s
        WHERE user_id = %s"""

        try:
            cursor.execute(query, (
                data["name"],
                data["first_surname"],
                data["second_surname"],
                data["email"],
                data["phone"],
                data["address"],
                data["city"],
                user_id
            ))
            connection.commit()

            return None, True, "Usuario actualizado correctamente"
        except Exception as e:
            connection.rollback()
            return f"Error al ejecutar la consulta", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def update_password(user_id: int, password: str):

        connection = get_connection()
        cursor = connection.cursor()

        query = """
        UPDATE USERS SET
            user_password = %s
        WHERE user_id = %s
        """
        new_password = password.encode("utf-8")
        hash_password = bcrypt.hashpw(
            new_password, bcrypt.gensalt(rounds=12)).decode("utf-8")

        try:
            cursor.execute(query, (hash_password, user_id))

            connection.commit()

            return None, True, "Contraseña actualizada correctamente"
        except Exception:
            connection.rollback()
            return f"Error al actualizar la contraseña", False, None
        finally:
            cursor.close()
            connection.close()

    # Deshabilitar un usuario
    @staticmethod
    def disable(user_id: int):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM USERS WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()
        if not user:
            cursor.close()
            connection.close()
            return "Usuario no encontrado", False, None

        query = "UPDATE USERS SET user_status = 1 WHERE user_id = %s"

        try:
            cursor.execute(query, (user_id,))
            connection.commit()
            return None, True, "Usuario deshabilitado correctamente"
        except Exception:
            return "Error la intentar deshabilitar el usuario", False, None
        finally:
            cursor.close()
            connection.close()

    # Habilitar un usuario
    @staticmethod
    def enable(user_id: int):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM USERS WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()
        if not user:
            cursor.close()
            connection.close()
            return "Usuario no encontrado", False, None

        query = "UPDATE USERS SET user_status = 2 WHERE user_id = %s"

        try:
            cursor.execute(query, (user_id,))
            connection.commit()
            return None, True, "Usuario habilitado correctamente"
        except Exception:
            return "Error la intentar habilitar el usuario", False, None
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_all_roles():
        connection = get_connection()
        cursor = connection.cursor()

        query = "SELECT rol_id, rol_name FROM ROLES"

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
            return f"Error al ejecutar la consulta: {e}"
        finally:
            connection.close()
            cursor.close()

    #   ------------ REPORTES DE USUARIOS ------------

    @staticmethod
    def find_recent_users():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        try:

            query = """
            SELECT
                user_name,
                user_first_surname,
                user_email,
                user_phone,
                user_date,
                user_status
            FROM USERS
            ORDER BY user_date DESC
            LIMIT 6
            """

            cursor.execute(query)
            result = cursor.fetchall()

            data = [
                {
                    "name": item["user_name"],
                    "surname": item["user_first_surname"],
                    "email": item["user_email"],
                    "phone": item["user_phone"],
                    "date": date_formatter(item["user_date"]),
                    "status": item["user_status"]
                }
                for item in result
            ]

            return None, data

        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None

        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_users_by_rol(period: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        try:
            if period not in period_map:
                period = "30d"

            interval = period_map.get(period, "30 DAY")

            query = f"""
            SELECT
                r.rol_name,
                COUNT(u.user_id) as users
            FROM USERS AS u 
            INNER JOIN ROLES AS r
            ON u.rol_id = r.rol_id
            WHERE u.user_date >= DATE_SUB(NOW(), INTERVAL {interval})
            GROUP BY r.rol_name
            """

            cursor.execute(query)
            result = cursor.fetchall()

            return None, result

        except Exception as e:
            return f"Error al ejecutar la consulta: {e}", None

        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def find_users_growth(period: str):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        if period not in period_map:
            period = "30d"

        interval = period_map.get(period, "30 DAY")
        use_daily = period in daily_periods

        if use_daily:
            group_expr = "DATE(user_date)"
            select_expr = "DATE(user_date) as label"
        else:
            group_expr = "DATE_FORMAT(user_date, '%Y-%m')"
            select_expr = "DATE_FORMAT(user_date, '%Y-%m') as label"

        query = f"""
        SELECT
            {select_expr},
            COUNT(DISTINCT user_id) as users
        FROM USERS
        WHERE user_date >= DATE_SUB(NOW(), INTERVAL {interval})
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
    def find_users_by_status():
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            COUNT(CASE WHEN user_date >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as recent_users,
            COUNT(CASE WHEN user_status = 2 THEN 1 END) as active_users,
            COUNT(CASE WHEN user_status = 1 THEN 1 END) as inactive_users,
            COUNT(user_id) as total_users
        FROM USERS
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
