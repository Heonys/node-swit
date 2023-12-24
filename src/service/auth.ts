import { HttpClient } from "@/client/http";
import type TokenStorage from "@/db/token";

export default class AuthService {
  constructor(
    public http: HttpClient,
    public tokenStorage: TokenStorage
  ) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username: string, password: string, name: string, email: string, url: string) {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, password, name, email, url }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username: string, password: string) {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    if (!token) return undefined;
    return this.http.fetch("/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
