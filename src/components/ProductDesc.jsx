import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:5555/api/v1/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product added to Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add product to cart",
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4 w-full">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
        {product.productName}
      </h1>

      <p className="text-gray-800 text-sm md:text-base">
        {product.category} | {product.brand}
      </p>

      <h2 className="text-pink-500 font-bold text-xl md:text-2xl">
        ₹{product.productPrice}
      </h2>

      <p className="line-clamp-6 md:line-clamp-12 text-muted-foreground text-sm md:text-base">
        {product.productDesc}
      </p>

      <div className="flex gap-2 items-center w-full sm:w-[300px]">
        <p className="text-gray-800 font-semibold text-sm md:text-base">
          Quantity :
        </p>

        <Input type="number" className="w-14" defaultValue={1} min={1} />
      </div>

      <Button
        onClick={() => addToCart(product._id)}
        className="bg-pink-600 w-full sm:w-max"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
