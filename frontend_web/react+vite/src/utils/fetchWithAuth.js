import { apiRoutes } from "../config/apiRoutes";

let isRefreshing = false;

export async function fetchWithAuth(url, options = {}) {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // Si el access_token venció, intenta refrescar
  if (response.status === 401 && !isRefreshing) {
    isRefreshing = true;

    const refreshResponse = await fetch(
      `${apiRoutes.apiUrl}${apiRoutes.auth}/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    isRefreshing = false;

    if (!refreshResponse.ok) {
      window.location.href = "/login";
      return;
    }

    response = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return response;
}
