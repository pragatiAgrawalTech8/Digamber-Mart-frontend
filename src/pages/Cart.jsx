import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import { setCart } from "@/redux/productSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.product);
  // console.log(cart);
  const subtotal = cart?.totalPrice;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  const navigate = useNavigate();

  const API = "http://localhost:5555/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    loadCart();
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.data.success) {
          dispatch(setCart(res.data.cart));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [dispatch]);
  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      // toast.error(
      //   error.response?.data?.message || "Failed to update cart"
      // );
    }
  };
  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

 return (
  <div className="pt-32 bg-gray-50 min-h-screen px-4 md:px-0">
    {cart?.items?.length > 0 ? (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 md:mb-7">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-7">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-5">
            {cart?.items?.map((product, index) => {
              if (!product?.productId) {
                return (
                  <Card key={index} className="p-4 md:p-6 border-red-200">
                    <p className="text-red-500 font-medium">
                      This product is no longer available.
                    </p>

                    <Button
                      variant="destructive"
                      className="mt-3"
                      onClick={() => handleRemove(product._id)}
                    >
                      Remove
                    </Button>
                  </Card>
                );
              }

              return (
                <Card key={index} className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-[300px] md:w-[350px]">
                      <img
                        src={product.productId.productImg?.[0]?.url}
                        alt={product.productId.productName}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover shrink-0"
                      />

                      <div className="min-w-0">
                        <h1 className="font-semibold text-base md:text-lg truncate">
                          {product.productId.productName}
                        </h1>

                        <p className="text-gray-600 text-sm md:text-base">
                          ₹{product.productId.productPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              "decrease"
                            )
                          }
                        >
                          -
                        </Button>

                        <span className="font-semibold">
                          {product.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              "increase"
                            )
                          }
                        >
                          +
                        </Button>
                      </div>

                      <p className="font-semibold text-base md:text-lg">
                        ₹
                        {product.productId.productPrice *
                          product.quantity}
                      </p>

                      <button
                        onClick={() =>
                          handleRemove(product.productId._id)
                        }
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm md:text-base"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[380px]">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cart?.items?.length} items)</span>
                  <span>₹{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex gap-2">
                    <Input placeholder="Promo Code" />
                    <Button variant="outline">Apply</Button>
                  </div>

                  <Button
                    onClick={() => navigate("/address")}
                    className="w-full bg-pink-600"
                  >
                    PLACE ORDER
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground pt-4">
                  <p>* Free shipping on orders over 299</p>
                  <p>* 30-days return policy</p>
                  <p>* Secure checkout with SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-pink-100 p-6 rounded-full">
          <ShoppingCart className="w-16 h-16 text-pink-600" />
        </div>

        <h2 className="mt-6 text-xl md:text-2xl font-bold">
          Your Cart is Empty
        </h2>

        <p className="mt-2 text-gray-600">
          Looks like you haven't added anything yet.
        </p>

        <Button
          onClick={() => navigate("/products")}
          className="mt-6 bg-pink-600 hover:bg-pink-700"
        >
          Start Shopping
        </Button>
      </div>
    )}
  </div>
);
};

export default Cart;
