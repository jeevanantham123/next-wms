// lib/apiClient.js

const apiClient = async (
  url,
  method = "GET",
  data = undefined,
  options = {}
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  // Attach the body only if data is provided and method is not GET
  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL + "/api" || "http://localhost:3000/api";

  const response = await fetch(`${baseUrl}${url}`, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
};

// Convenience wrappers for each HTTP method
export const get = (url, options) => apiClient(url, "GET", undefined, options);
export const post = (url, data, options) =>
  apiClient(url, "POST", data, options);
export const put = (url, data, options) => apiClient(url, "PUT", data, options);
export const del = (url, options) =>
  apiClient(url, "DELETE", undefined, options);
export const patch = (url, data, options) =>
  apiClient(url, "PATCH", data, options);

export default apiClient;
