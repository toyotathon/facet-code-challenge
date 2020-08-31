import axios from "axios";
import { CreateFormRequest, DeleteFormsRequest } from "../types";

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

  static async deleteForms(formIds: DeleteFormsRequest) {
    try {
      await this.instance.delete("", { data: formIds });
    } catch (e) {
      console.error(e);
    }
  }
}
