import Category from "@/models/category";
import Product from "@/models/product";
import categoryService from "@/services/category.service";
import productService from "@/services/product.service";
import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

type FormCreateProductProps = {
  setproducts: Function;
  products: Product[];
};
const FormCreateProduct = ({
  setproducts,
  products,
}: FormCreateProductProps) => {
  const [category, setCategory] = useState<Category[]>([]);
  useEffect(() => {
    const getCategory = async () => {
      const data = await categoryService.getCategories();
      if (data !== undefined) setCategory(data);
    };
    getCategory();
  }, []);

  const createProduct = async (values: any) => {
    const data = await productService.createProduct(values);
    if (data !== undefined) setproducts([...products, data]);
  };
  return (
    <Form
      layout="horizontal"
      onFinish={async (values) => {
        let newValues = values;
        newValues.images = ["https://placeimg.com/640/480/any"];
        createProduct(newValues);
      }}
      style={{ maxWidth: 600, marginTop: "1rem" }}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item name="categoryId" label="CategoryId">
        <Select>
          {category.map((category: Category) => {
            return (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="images" label="Images">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCreateProduct;
