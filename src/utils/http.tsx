import axios from 'axios';
import moment from 'moment';

interface Params {
  [key: string]: any;
}

interface PostOptions {
  withAuth?: boolean;
  withFromData?: boolean;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authHeader = async (): Promise<{ Authorization: string }> => {
  const accessToken = localStorage.getItem('access_token');
  try {
    if (accessToken) {
      const tokenType = localStorage.getItem('token_type');
      const expiredAt = Number(localStorage.getItem('expired_at') ?? 0);
      const currentTime = new Date();

      if (currentTime.getTime() >= expiredAt * 1000) {
        const refreshToken = localStorage.getItem('refresh_token');
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_API_DOMAIN}/refresh-token`,
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        };
        const { data } = (await axios.request(config)) as any;
        localStorage.setItem('access_token', data?.accessToken);
        localStorage.setItem('refresh_token', data?.refreshToekn);
        localStorage.setItem('role', data.roleName);
        localStorage.setItem(
          'expired_at',
          data.accessTokenExpiration.toString(),
        );
        localStorage.setItem('token_type', 'Bearer');
        return authHeader();
      }
      return { Authorization: `${tokenType} ${accessToken}` };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    throw handleError(error);
  }
};

const handleError = (err: any) => {
  localStorage.removeItem('token_type');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('extension');
  localStorage.removeItem('user');
  window.location.href = '/';
  throw err;
};

async function get<T>(
  url: string,
  params: Params = {},
  withAuth: boolean = true,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (withAuth) {
    try {
      const auth = await authHeader();
      Object.assign(headers, auth);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  try {
    const response = await instance.get<T>(url, { params, headers });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function post<T>(
  url: string,
  body: Params = {},
  options: PostOptions = {},
): Promise<T> {
  const { withAuth = true, withFromData = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': withFromData ? 'multipart/form-data' : 'application/json',
  };

  if (withAuth) {
    try {
      const auth = await authHeader();
      Object.assign(headers, auth);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  try {
    const response = await instance.post<T>(url, body, { headers });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function put<T>(
  url: string,
  body: Params = {},
  withAuth: boolean = true,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const config = { headers };

  if (withAuth) {
    try {
      const auth = await authHeader();
      Object.assign(config.headers, auth);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  try {
    const response = await instance.put<T>(url, body, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function patch<T>(
  url: string,
  body: Params = {},
  withAuth: boolean = true,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const config = { headers };

  if (withAuth) {
    try {
      const auth = await authHeader();
      Object.assign(config.headers, auth);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  try {
    const response = await instance.patch<T>(url, body, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function del<T>(url: string, withAuth: boolean = true): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const config = { headers };

  if (withAuth) {
    try {
      const auth = await authHeader();
      Object.assign(config.headers, auth);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  try {
    const response = await instance.delete<T>(url, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const http = {
  get,
  post,
  put,
  patch,
  del,
};
