const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8000/api/v1";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error.detail || "Something went wrong"
    );
  }

  return response.json();
}