import { Space, Spin } from "antd";
import { useEffect, useState } from "react";
import productService from "@/services/product.service";
import MainTitle from "@/components/MainTitle";
import Product from "@/models/product";
import ProductCard from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";

export default function Home() {
  //TODO: Poner indicador de que se creo el producto y que se cierre el popUp
  //TODO: Ediar un producto: que se habra un popUp y que tenga los valores iniciales y luego lo varies y envies la data a la api
  //TODO: Crear una pagina dinamica de perfil de producto
  //TODO: Eliminar productos
  const { loading, products } = useProducts();
  return (
    <>
      <MainTitle title="Products" />
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
        {products.map((product: Product, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </Space>
    </>
  );
}
