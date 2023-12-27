import { HttpClient } from "@/client/http";

export default class AuthService {
  constructor(public http: HttpClient) {
    this.http = http;
  }

  async signup(username: string, password: string, name: string, email: string, url: string) {
    return this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, password, name, email, url }),
    });
  }

  async login(username: string, password: string) {
    return this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  async me() {
    return this.http.fetch("/auth/me", {
      method: "GET",
    });
  }

  async logout() {
    return this.http.fetch("/auth/logout", {
      method: "POST",
    });
  }
  async scrfToken() {
    const resp = await this.http.fetch("/auth/csrf-token", {
      method: "GET",
    });
    return resp.csrfToken;
  }
}
