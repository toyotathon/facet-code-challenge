import axios from "axios";

export interface LoginRequest {
  userName: string;
  password: string;
}


export class AuthService {
  static instance = axios.create({
    baseURL: "/auth",
  });

  static async sendLoginRequest(request: LoginRequest) {
    return this.instance.post("/login", request)
  }

  static async sendLogoutRequest() {
    return this.instance.get("/logout")
  }
}
