const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

async function fetchJSON(endpoint: string, options: FetchOptions = {}) {
  const { params, ...init } = options;
  
  const url = new URL(endpoint, API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) => 
    fetchJSON(endpoint, { ...options, method: 'GET' }) as Promise<T>,
  
  post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    fetchJSON(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }) as Promise<T>,
  
  put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    fetchJSON(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }) as Promise<T>,
  
  delete: <T>(endpoint: string, options?: FetchOptions) =>
    fetchJSON(endpoint, { ...options, method: 'DELETE' }) as Promise<T>,
}; 