import axios from "axios";
import { GetDashboardDataResponse } from "../types";

export class DashboardRequests {
  static instance = axios.create({
    baseURL: "/api/dashboard",
  });

  static async getDashboardData(): Promise<GetDashboardDataResponse> {
    const { data } = await this.instance.get("");
    return data;
  }
}
