import axios from "axios";
export class UploadService {
  static instance = axios.create({
    baseURL: "/api/upload",
  });

  static async uploadFile(file: File) {
    const fileData = new FormData();
    fileData.append("file", file);
    await this.instance.post("", fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
