import axios from 'axios';
import { eventBus } from '@/main';
import { TOAST } from '@/constants';
import path from 'path';

export default class Api {
  static jwtToken = null;
  static apiPath = 'api';

  constructor() {
    this.axiosInstance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
  }

  buildPath(...paths) {
    return '/' + path.join(Api.apiPath, ...paths);
  }

  async send(options) {
    if (Api.jwtToken) {
      options.headers = { Authorization: `Bearer ${Api.jwtToken}` };
    }

    if (!options.method) {
      options.method = 'GET';
    }

    return await this.#exec(options);
  }

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

  handleBadResponse(message) {
    eventBus.$emit('toast', {
      type: TOAST.ERROR,
      message,
      title: 'Something went wrong...',
    });
  }
}
