import axios, { AxiosInstance } from "axios";
import type { AuthErrorEventBus } from "@/context/AuthContext";
import axiosRetry from "axios-retry";

export class HttpClient {
  public client: AxiosInstance;
  constructor(
    baseUrl: string,
    public authErrorEventBus: AuthErrorEventBus,
    public getCsrfToken: () => any
  ) {
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    axiosRetry(this.client, {
      retries: 5,
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * 100;
        const jitter = delay * 0.1 * Math.random();
        return delay + jitter;
      },
      retryCondition: (err) => axiosRetry.isNetworkOrIdempotentRequestError(err) || err.response?.status === 429,
    });
  }

  async fetch(url: string, options: RequestInit) {
    const { headers, method, body } = options;
    const req: any = {
      url,
      method,
      data: body,
      headers: {
        ...headers,
        "_csrf-token": this.getCsrfToken(),
      },
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        const message = data && data.message ? data.message : "something went wrong";
        throw new Error(message);
      }
      throw new Error("connecttion Error ");
    }
  }
}
