import axios from "axios";

export interface DashboardData {
  totalRevenue: number;
  customerCount: number;
}

export class DashboardService {
  static instance = axios.create({
    baseURL: "/api/dashboard",
  });

  static async getDashboardData(): Promise<DashboardData> {
    const { data } = await this.instance.get("");
    return data;
  }
}
