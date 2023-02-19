import Product from "@/models/product";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Image } from "antd";
import React from "react";
type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  return (
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
  );
};

export default ProductCard;
