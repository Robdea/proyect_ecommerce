import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // envía cookies automáticamente
});

let isRefreshing = false;

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
};

let failedQueue: QueueItem[] = [];

const processQueue = (error: any | null, token?: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si no es 401, simplemente pasa el error
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Evitar intentar refresh para la propia request /auth/refresh
    if (originalRequest.url.includes("auth/refresh")) {
      processQueue(error);
      return Promise.reject(error);
    }

    // Evitar múltiples refresh simultáneos
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => api(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      // Intenta refresh; si no hay refresh token válido, esto fallará
      await api.get("auth/refresh");

      // Si refresh tuvo éxito, reintenta la request original
      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh falló → limpia la cola y no reintenta
      processQueue(refreshError);

      // No hacemos redirect; solo notificamos al frontend
      window.dispatchEvent(new CustomEvent("auth-expired"));

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
