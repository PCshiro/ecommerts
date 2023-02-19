import { Button, Space, Table, Card, Image, Avatar, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Home() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <div className="mainTitle">
        <h1>Products</h1>
      </div>

      <Space
        size={[25, 16]}
        wrap
        align="center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && <Spin />}
        {products.map((product: any) => (
          <Card
            style={{ width: 200 }}
            title={product.title}
            cover={<Image alt="example" src={product.images[0]} />}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          ></Card>
        ))}
      </Space>
    </>
  );
}
