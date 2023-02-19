import {
  Divider,
  Table,
  Image,
  Space,
  Button,
  Modal,
  Form,
  Radio,
  Input,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [products, setproducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<any[]>([]);
  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      const data = await response.json();
      setCategory(data);
      setLoading(false);
    };
    getCategory();
  }, []);
  const createProduct = async (values: any) => {
    setLoading(true);
    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Gaaaaaa",
        price: 10,
        description: "A description",
        categoryId: 1,
        images: ["https://placeimg.com/640/480/any"],
      }),
    });
    const data = await response.json();
    setproducts([...products, data]);
    setLoading(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setLoading(false);
      setproducts(data);
    };
    getProducts();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images: any) => {
        return (
          <div>
            {images.map((image: any) => {
              return <Image src={image} alt="" width={100} height={100} />;
            })}
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "CreationAt",
      dataIndex: "creationAt",
      key: "creationAt",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: any) => {
        return (
          <div>
            <p>{category.name}</p>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <span>
          <a href="#">Edit</a>
          <Divider type="vertical" />
          <a href="#">Delete</a>
        </span>
      ),
    },
  ];
  return (
    <>
      <div className="mainTitle">
        <h1>Dashboard Products</h1>
      </div>
      <Modal
        title="Add product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="horizontal"
          onFinish={async (values) => {
            console.log(values);
            createProduct({});
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
              {category.map((category: any) => {
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
      </Modal>
      <Space style={{ margin: "2rem 1rem" }}>
        <Button type="primary" onClick={showModal}>
          Add product
        </Button>
      </Space>
      <Table loading={loading} columns={columns} dataSource={products} />
    </>
  );
};

export default AdminPage;
