import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function deleteSubcategoryService(subcategory_id) {
    const res = await fetch(`${apiRoutes.apiUrl}${apiRoutes.subcategories}/delete/${subcategory_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Authorization: getToken()
        }
    });

    if (!res.ok) {
        throw new Error("Error al intentar eliminar la subcategoria");
    }

    return await res.json()
}