
import { message } from "antd";
import { api, HttpMethod } from "@/utils/fetchApi";
import Category from "@/models/category";
class CategoryService {
  private static _basePath = `categories`;
  async getCategories(): Promise<Category[] | undefined> {
    try {
      return await api(HttpMethod.GET, `${CategoryService._basePath}/`);
    } catch (error) {
      message.error("Error while getting categories");
    }
  }
}

export default new CategoryService();
