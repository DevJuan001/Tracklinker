/* ¿Cuáles son las categorías y sus subcategorías asociadas? */
SELECT
    c.category_name,
    S.subcategory_name
    FROM SUBCATEGORIES AS s
    INNER JOIN CATEGORIES AS c
    ON c.category_id = s.category_id;

/* ¿Qué usuarios existen y cuál es el rol asignado a cada uno? */
SELECT
    r.rol_name,
    u.user_name,
    u.user_first_surname
    FROM USERS AS u
    INNER JOIN ROLES AS r
    ON u.rol_id = r.rol_id;

/* ¿Cúal es la marca de cada producto?*/
SELECT 
    pb.product_brand_name,
    pd.product_detail_model
    FROM PRODUCTS AS p
    INNER JOIN PRODUCT_DETAILS AS pd
    ON p.product_details_id = pd.product_details_id
    INNER JOIN PRODUCT_BRANDS AS pb
    ON pd.product_brand_id = pb.product_brand_id;

/* ¿Qué transformaciones a solicitado cada usuario, con su dirección y los requerimientos del cliente? */
SELECT
    u.user_id,
    u.user_name,
    u.user_address,
    c.out_order_id
    FROM USERS AS u
    INNER JOIN CUSTOMERS AS c
    ON u.user_id = c.user_id
    INNER JOIN OUTPUT_ORDERS AS o
    ON c.out_order_id = o.out_order_id;

/* ¿Qué productos existen junto con su categoría, subcategoría, marca, modelo y descripción? */
SELECT
    c.category_name,
    sc.subcategory_name,
    p.product_id,
    io.input_order_id,
    pd.product_detail_model,
    pd.product_detail_description,
    pb.product_brand_name,
    s.supplier_name
    FROM SUPPLIERS AS s
    INNER JOIN INPUT_ORDERS AS io
    ON s.supplier_id = io.supplier_id
    INNER JOIN PRODUCT_SERIALS AS ps
    ON io.input_order_id = ps.input_order_id
    INNER JOIN PRODUCTS AS p
    ON ps.product_id = p.product_id
    INNER JOIN PRODUCT_DETAILS AS pd
    ON p.product_details_id = pd.product_details_id
    INNER JOIN PRODUCT_BRANDS AS pb 
    ON pd.product_brand_id = pb.product_brand_id
    INNER JOIN SUBCATEGORIES AS sc
    ON p.subcategory_id = sc.subcategory_id
    INNER JOIN CATEGORIES AS c
    ON sc.category_id = c.category_id
    ORDER BY p.product_id ASC;

/* ¿Qué productos tienen stock bajo (por ejemplo, menor a 5) y a qué categoría pertenecen? (PRODUCTS, SUBCATEGORIES, CATEGORIES) */
SELECT
    s.subcategory_name,
    c.category_name,
    pd.product_detail_model,
    p.product_stock
    FROM PRODUCTS AS p
    INNER JOIN PRODUCT_DETAILS AS pd
    ON p.product_details_id = pd.product_details_id
    INNER JOIN SUBCATEGORIES AS s
    ON p.subcategory_id = s.subcategory_id
    INNER JOIN CATEGORIES AS c
    ON s.category_id = c.category_id
    WHERE product_stock <= 15;

/* ¿Qué proveedores abastecen productos de una marca específica? (SUPPLIERS, INPUT_ORDERS, PRODUCT_SERIALS, PRODUCTS, PRODUCT_DETAILS, PRODUCT_BRANDS) */
SELECT
    s.supplier_name,
    pb.product_brand_name,
    pd.product_detail_model,
    io.input_order_id
    FROM SUPPLIERS AS s
    INNER JOIN INPUT_ORDERS AS io 
    ON s.supplier_id = io.supplier_id
    INNER JOIN PRODUCT_SERIALS AS ps 
    ON io.input_order_id = ps.input_order_id
    INNER JOIN PRODUCTS AS p 
    ON ps.product_id = p.product_id
    INNER JOIN PRODUCT_DETAILS AS pd 
    ON p.product_details_id = pd.product_details_id
    INNER JOIN PRODUCT_BRANDS AS pb 
    ON pd.product_brand_id = pb.product_brand_id
    WHERE pb.product_brand_name = 'Lenovo';
    
/* ¿Qué proveedor entregó los productos que aparecen en una orden de salida específica? (SUPPLIERS, INPUT_ORDERS, PRODUCT_SERIALS, OUTPUT_DETAILS, OUTPUT_ORDERS) */
SELECT 
	s.supplier_name,
    oo.out_order_id,    
    od.product_serial
	FROM SUPPLIERS AS s
    INNER JOIN INPUT_ORDERS AS io
    ON s.supplier_id = io.supplier_id
    INNER JOIN PRODUCT_SERIALS AS ps
    ON io.input_order_id = ps.input_order_id
    INNER JOIN OUTPUT_DETAILS AS od
    ON ps.product_serial = od.product_serial
    INNER JOIN OUTPUT_ORDERS AS oo
    ON od.out_order_id = oo.out_order_id
    WHERE oo.out_order_id = 5;

/* ¿Qué clientes reportaron incidentes de garantía y qué producto estaba asociado? (WARRANTY_INCIDENTS, OUTPUT_DETAILS, PRODUCT_SERIALS, PRODUCTS) */
SELECT 
	wi.warranty_customer,
	wi.warranty_incidents_id,
    wi.product_serial,
    pd.product_detail_description
    FROM WARRANTY_INCIDENTS AS wi    
    INNER JOIN OUTPUT_DETAILS AS od
    ON wi.product_serial=od.product_serial
    INNER JOIN PRODUCT_SERIALS AS ps
    ON od.product_serial=ps.product_serial
    INNER JOIN PRODUCTS AS p
    ON ps.product_id=p.product_id
    INNER JOIN PRODUCT_DETAILS AS pd
    ON p.product_details_id=pd.product_details_id;

/* ¿Qué técnicos resolvieron garantías de productos de la marca X? (TECHNICAL, USERS, WARRANTY_INCIDENTS, OUTPUT_DETAILS, PRODUCT_SERIALS, PRODUCTS, PRODUCT_DETAILS, PRODUCT_BRANDS) */
/* ¿Qué técnicos tienen asignados las incidencias de garantía y qué producto está asociado? (WARRANTY_INCIDENTS, OUTPUT_DETAILS, PRODUCT_SERIALS, PRODUCTS) */
SELECT 
	u.user_name,
    u.user_first_surname,
    u.user_second_surname,
	wi.warranty_incidents_id,
    wi.product_serial,
     pd.product_detail_description
    FROM WARRANTY_INCIDENTS AS wi
    INNER JOIN TECHNICAL AS t
    ON wi.warranty_incidents_id=t.warranty_incidents_id
    INNER JOIN USERS AS u
    ON t.user_id=u.user_id
    INNER JOIN OUTPUT_DETAILS AS od
    ON wi.product_serial=od.product_serial
    INNER JOIN PRODUCT_SERIALS AS ps
    ON od.product_serial=ps.product_serial
    INNER JOIN PRODUCTS AS p
    ON ps.product_id=p.product_id
    INNER JOIN PRODUCT_DETAILS AS pd
    ON p.product_details_id=pd.product_details_id;

/* ¿Qué empleados de almacén recibieron órdenes de entrada de un proveedor en particular? (USERS, WAREHAUSEMAN, INPUT_ORDERS, SUPPLIERS) */
SELECT
    u.user_name,
    s.supplier_name,
    io.input_order_id
    FROM USERS AS u
    INNER JOIN WAREHAUSEMAN AS wm 
    ON u.user_id = wm.users_id
    INNER JOIN INPUT_ORDERS AS io 
    ON wm.input_order_id = io.input_order_id
    INNER JOIN SUPPLIERS AS s 
    ON io.supplier_id = s.supplier_id
    WHERE s.supplier_name = 'Mayorista';

/* ¿Qué proveedor ha enviado más productos a través de órdenes de entrada? (SUPPLIERS, INPUT_ORDERS, PRODUCT_SERIALS) */
/* ¿Qué clientes realizaron más de 3 órdenes de salida en un mismo mes? (CUSTOMERS, OUTPUT_ORDERS) */
SELECT DISTINCT
    u.user_name,
    COUNT(oo.out_order_id) AS Outputs
    FROM USERS AS u
    INNER JOIN CUSTOMERS AS c
    ON u.user_id = c.user_id
    INNER JOIN OUTPUT_ORDERS AS oo
    ON c.out_order_id = oo.out_order_id
    WHERE oo.out_order_date BETWEEN '2025-01-01' AND '2025-05-31'
    HAVING COUNT(oo.out_order_id) >= 3;

/* ¿Qué clientes reportaron más de 2 incidentes de garantía en un mismo año? (CUSTOMERS, OUTPUT_ORDERS, WARRANTY_INCIDENTS) */
SELECT 
    u.user_name,
    u.user_first_surname,
    COUNT(wi.warranty_incidents_id) AS Warranties
    FROM USERS AS u
    INNER JOIN CUSTOMERS AS c
    ON u.user_id = c.user_id
    INNER JOIN OUTPUT_ORDERS AS oo
    ON c.out_order_id = oo.out_order_id
    INNER JOIN OUTPUT_DETAILS AS od
    ON oo.out_order_id = od.out_order_id
    INNER JOIN WARRANTY_INCIDENTS AS wi
    ON od.product_serial = wi.product_serial
    WHERE YEAR(wi.warranty_date) = 2025
    GROUP BY u.user_id, u.user_name, u.user_first_surname
    HAVING COUNT(wi.warranty_incidents_id) >= 2;

/* ¿Qué proveedores tuvieron más productos con incidentes de garantía? (SUPPLIERS, INPUT_ORDERS, PRODUCT_SERIALS, OUTPUT_DETAILS, WARRANTY_INCIDENTS) */
/* ¿Qué clientes compraron más productos de la marca Dell y cuál fue el total gastado? (CUSTOMERS, OUTPUT_ORDERS, OUTPUT_DETAILS, PRODUCT_SERIALS, PRODUCTS, PRODUCT_DETAILS, PRODUCT_BRANDS) */
/* ¿Qué proveedor tiene más diversidad de productos (por categorías)? (SUPPLIERS, INPUT_ORDERS, PRODUCT_SERIALS, PRODUCTS, SUBCATEGORIES, CATEGORIES) */

/* ¿Qué técnicos atendieron más de 10 incidentes en 2025? (TECHNICAL, WARRANTY_INCIDENTS) */
SELECT
	u.user_name,
    COUNT(wi.warranty_incidents_id)
    FROM USERS AS u
    INNER JOIN TECHNICAL AS t
    ON u.user_id = t.user_id
    INNER JOIN WARRANTY_INCIDENTS AS wi
    ON t.warranty_incidents_id = wi.warranty_incidents_id
    WHERE wi.warranty_date BETWEEN '2025-01-01' AND '2025-12-31'
    HAVING COUNT(wi.warranty_incidents_id) >= 10;

/* ¿Qué proveedores no han ingresado productos desde 2024? (SUPPLIERS, INPUT_ORDERS) */
SELECT
    s.supplier_name,
    io.input_order
    FROM SUPPLIERS AS s
    INNER JOIN INPUT_ORDERS AS io 
    ON s.supplier_id = io.supplier_id
    WHERE io.input_order_date < '2024-01-01';

/* ¿Qué técnicos atendieron incidentes de más de 5 clientes distintos? (TECHNICAL, WARRANTY_INCIDENTS, CUSTOMERS) */
SELECT
    u.user_name,
    COUNT(c.user_id) AS Clientes
    FROM USERS AS u
    INNER JOIN TECHNICAL AS t
    ON u.user_id = t.user_id
    INNER JOIN WARRANTY_INCIDENTS AS wi
    ON t.warranty_incidents_id = wi.warranty_incidents_id
    INNER JOIN OUTPUT_DETAILS AS od
    ON wi.product_serial = od.product_serial
    INNER JOIN OUTPUT_ORDERS AS oo
    ON od.out_order_id = oo.out_order_id
    INNER JOIN CUSTOMERS AS c
    ON oo.out_order_id = c.out_order_id
    INNER JOIN USERS
    ON u.user_id = c.user_id
    HAVING COUNT(c.user_id) > 5;

/* ¿Qué encargados de almacén registraron más de 50 productos en un solo día? (WAREHAUSEMAN, INPUT_ORDERS, PRODUCT_SERIALS) */
SELECT
     u.user_name,
     io.input_order_date,
     ps.product_serial,
     COUNT(ps.product_serial) AS total_products
    FROM users AS u
    INNER JOIN WAREHAUSEMAN AS wm
    ON wm.users_id = u.user_id
    INNER JOIN INPUT_ORDERS AS io
    ON wm.input_order_id = io.input_order_id
    INNER JOIN PRODUCT_SERIALS AS ps
    ON io.input_order_id = ps.input_order_id
    INNER JOIN PRODUCTS AS p
    ON ps.product_id = p.product_id
    HAVING COUNT(ps.product_serial) > 50;


   

   
   






