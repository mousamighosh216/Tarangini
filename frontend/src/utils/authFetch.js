const API_BASE = "http://127.0.0.1:8000";

export async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Token expiry handling will come in step 4
  return response;
}

export function logout() {
  localStorage.removeItem("access_token");
}