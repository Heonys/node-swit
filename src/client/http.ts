import type { AuthErrorEventBus } from "@/context/AuthContext";

export class HttpClient {
  constructor(
    public baseUrl: string,
    public authErrorEventBus: AuthErrorEventBus
  ) {
    this.baseUrl = baseUrl;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url: string, options?: RequestInit) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
    }

    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : "something went wrong";
      const error = new Error(message);
      if (response.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }
    return data;
  }
}
