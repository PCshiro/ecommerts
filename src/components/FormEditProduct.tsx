import Category from "@/models/category";
import Product from "@/models/product";
import categoryService from "@/services/category.service";
import productService from "@/services/product.service";
import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";

type FormCreateProductProps = {
  SelectedProduct: Product | undefined;
  setIsModalOpen: Function;
  setproducts: Function;
  products: Product[];
};
const FormEditProduct = ({
  setIsModalOpen,
  SelectedProduct,
  setproducts,
  products,
}: FormCreateProductProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Se creo un nuevo producto");
  };
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
  };

  const editProduct = async (values: any, id: number) => {
    const data = await productService.updateProduct(values, id);
    if (data !== undefined) {
      let newProducts = products.map((product) => {
        if (product.id === data.id) {
          return data;
        }
        return product;
      });

      console.log(newProducts);
      setproducts(newProducts);
    }
  };

  return (
    <Form
      layout="horizontal"
      initialValues={{
        title: SelectedProduct?.title,
        description: SelectedProduct?.description,
        price: SelectedProduct?.price,
        categoryId: SelectedProduct?.category.id,
      }}
      onFinish={async (values) => {
        info();
        let newValues = values;
        newValues.images = ["https://placeimg.com/640/480/any"];
        editProduct(values, SelectedProduct?.id as number);

        setIsModalOpen(false);
      }}
      style={{ maxWidth: 600, marginTop: "1rem" }}
    >
      {contextHolder}
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item name="categoryId" label="CategoryId">
        <Select defaultValue={SelectedProduct?.category.id}>
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
        <Input defaultValue={SelectedProduct?.images} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Edit Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormEditProduct;
