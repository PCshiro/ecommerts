import Product from "@/models/product";
import productService from "@/services/product.service";
import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setproducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await productService.getProducts();
      if (data !== undefined) setproducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);
  return { products, loading, setproducts };
}
