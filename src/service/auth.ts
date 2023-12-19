export default class AuthService {
  async login(username: string, password: string) {
    return {
      username: "jiheon",
      token: "abc1234",
    };
  }

  async me() {
    return {
      username: "jiheon",
      token: "abc1234",
    };
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    return {
      username: "jiheon",
      token: "abc1234",
    };
  }
}
