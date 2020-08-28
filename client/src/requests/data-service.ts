import axios from "axios";
export interface SalesData {
  id: number;
  customerName: string;
  itemDescription: string;
  itemPrice: number;
  merchantName: string;
  merchantAddress: string;
  quantity: number;
}

export class DataService {
  static instance = axios.create({
    baseURL: "/api/data",
  });

  static async getAllUploadedData(): Promise<SalesData[]> {
    const { data } = await this.instance.get("");
    return data || [];
  }
}
