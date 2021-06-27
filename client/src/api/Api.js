import axios, { AxiosRequestConfig } from 'axios';
import { eventBus } from '@/main';
import { TOAST } from '@/constants';
import path from 'path';
import { localStorageToken } from '@/local-storage';

export class Api {
  static jwtToken = null;
  static apiPath = 'api';

  constructor() {
    this.axiosInstance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });

    this.#initInterceptors();
  }

  buildPath(...paths) {
    return '/' + path.join(Api.apiPath, ...paths);
  }

  /**
   * @param {AxiosRequestConfig} options
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async send(options) {
    if (Api.jwtToken) {
      options.headers = { Authorization: `Bearer ${Api.jwtToken}` };
    }

    if (!options.method) {
      options.method = 'GET';
    }

    return await this.#exec(options);
  }

  handleBadResponse(message) {
    eventBus.$emit('toast', {
      type: TOAST.ERROR,
      message,
      title: 'Something went wrong...',
    });
  }

  /**
   * @param {AxiosRequestConfig} options
   * @returns {Promise<{data: any, success: boolean}|{success: boolean, message}>}
   */
  async #exec(options) {
    let result;

    try {
      const { data } = await this.axiosInstance(options);
      result = { data, success: true };
    } catch (e) {
      const message = e.response.data.message;
      this.handleBadResponse(message);

      result = {
        success: false,
        message,
      };
    }

    return result;
  }

  #initInterceptors() {
    this.#requestInterceptor();
    this.#responseInterceptor();
  }

  #requestInterceptor() {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorageToken.get();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  #responseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const originalRequest = error.config;

        if (+error.response.status === 401 && error.config && !error.config._isRetry) {
          originalRequest._isRetry = true;

          try {
            const response = await axios.get(`/api/user/refresh`);
            localStorageToken.set(response.data.accessToken);
            return this.axiosInstance.request(originalRequest);
          } catch (e) {
            console.log('Unauthorized');
          }
        }
        throw error;
      }
    );
  }
}
