import Breadcrumbs from "@/components/Breadcrumbs";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { setProducts } from "@/redux/productSlice";
import { API_URL } from "@/utils/api";

const SingleProduct = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();  // ✅ Login redirect ke liye

  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    if (!products || products.length === 0) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/api/v1/product/getallproducts`,
          );
          if (res.data.success) {
            dispatch(setProducts(res.data.products));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchProducts();
    }
  }, []);

  const product = products?.find((item) => item._id === productId);

  // ✅ Add to Cart handler with login check
  const addToCart = async () => {
    const accessToken = localStorage.getItem("accessToken");

    // Agar user logged in nahi hai
    if (!accessToken) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    // Agar logged in hai
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/cart/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Product added to Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-10 px-4 md:px-0 max-w-7xl mx-auto">
      <Breadcrumbs product={product} />

      <div className="mt-6 md:mt-10 flex flex-col lg:grid lg:grid-cols-2 items-start gap-6 lg:gap-10">
        <ProductImg images={product?.productImg || []} product={product} />
        {/* ✅ ProductDesc ko addToCart function pass karein */}
        <ProductDesc product={product} addToCart={addToCart} />
      </div>
    </div>
  );
};

export default SingleProduct;