import MainTitle from "@/components/MainTitle";
import { Divider, Table, Image, Space, Button, Modal } from "antd";
import React, { useState } from "react";
import useProducts from "@/hooks/useProducts";
import FormCreateProduct from "@/components/FormCreateProduct";
import Product from "@/models/product";
import FormEditProduct from "@/components/FormEditProduct";
import productService from "@/services/product.service";
const AdminPage = () => {
  const [isModalOpen1, setIsModalOpen1] = useState<boolean>(false);
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
  const { loading, products, setproducts } = useProducts();
  const [SelectedProduct, setSelectedProduct] = useState<Product>();

  const deleteProduct = async (id: number) => {
    const data = await productService.deleteProduct(id);
    console.log(data);

    if (data !== undefined) {
      let newProducts = products.filter((product) => {
        return product.id != id;
      });

      console.log(newProducts);
      setproducts(newProducts);
    }
  };

  const showModal = () => {
    setIsModalOpen1(true);
  };

  const handleOk = () => {
    setIsModalOpen1(false);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
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
      render: (text: any, record: Product) => {
        //console.log(record)
        return (
          <span>
            <a
              href="#"
              onClick={() => {
                showModal2();
                setSelectedProduct(record);
              }}
            >
              Edit
            </a>
            <Divider type="vertical" />
            <a
              href="#"
              onClick={() => {
                deleteProduct(record.id);
              }}
            >
              Delete
            </a>
          </span>
        );
      },
    },
  ];
  return (
    <>
      <MainTitle title="Dashboard Products" />
      <Modal
        title="Add product"
        open={isModalOpen1}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FormCreateProduct
          setIsModalOpen={setIsModalOpen1}
          products={products}
          setproducts={setproducts}
        />
      </Modal>
      <Modal
        title="Edit Product"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
      >
        <FormEditProduct
          products={products}
          setproducts={setproducts}
          setIsModalOpen={setIsModalOpen2}
          SelectedProduct={SelectedProduct}
        />
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
