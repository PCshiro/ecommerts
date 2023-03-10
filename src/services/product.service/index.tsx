import { message } from "antd";
import { api, HttpMethod } from "@/utils/fetchApi";
import Product from "@/models/product";
class ProductService {
  private static _basePath = `products`;
  async getProducts(): Promise<Product[] | undefined> {
    try {
      return await api(HttpMethod.GET, `${ProductService._basePath}/`);
    } catch (error) {
      message.error("Error while getting products");
    }
  }
  async createProduct(values: any): Promise<Product | undefined> {
    try {
      return await api(HttpMethod.POST, `${ProductService._basePath}/`, values);
    } catch (error) {
      message.error("Error while creating product");
    }
  }
  async updateProduct(values: any,id : number): Promise<Product | undefined> {
    try {
      return await api(HttpMethod.PUT, `${ProductService._basePath}/${id}`, values);
    } catch (error) {
      message.error("Error while creating product");
    }
  }
  async deleteProduct(id : number): Promise<Product | undefined> {
    try {
      return await api(HttpMethod.DELETE, `${ProductService._basePath}/${id}`);
    } catch (error) {
      message.error("Error while creating product");
    }
  }
}

export default new ProductService();
