import MainTitle from "@/components/MainTitle";
import {
  Divider,
  Table,
  Image,
  Space,
  Button,
  Modal,
} from "antd";
import React, {  useState } from "react";
import useProducts from "@/hooks/useProducts";
import FormCreateProduct from "@/components/FormCreateProduct";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { loading, products, setproducts } = useProducts();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MainTitle title="Dashboard Products" />
      <Modal
        title="Add product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FormCreateProduct products={products} setproducts={setproducts} />
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
