import axios from "axios";
import { CreateFormRequest } from "../types";

export class FormRequests {
  static instance = axios.create({
    baseURL: "/api/form",
  });

  static async createForm(form: CreateFormRequest) {
    try {
      await this.instance.post("", form);
    } catch (e) {
      console.error(e);
    }
  }
}
