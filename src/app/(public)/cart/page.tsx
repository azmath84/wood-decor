"use client";

import CartProduct from "@/components/cart-product";
import CheckoutWithRazorpayAndAdmin from "@/components/checkout-razorpay";
import { Button } from "@/components/ui/button";
import useCartStore, { TCartProduct } from "@/store/cart";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  function calculateTotalPrice(products: TCartProduct[]) {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.price;
    }
    return totalPrice;
  }
  const { cartItems, removeItemFromCart, } = useCartStore();
  return (
    <main className="mt-28 md:mt-32 md:px-10">
      <h1 className="my-2 ml-10 font-gt">Cart</h1>
      <div className="flex  flex-col px-5 md:flex-row md:px-10 max-w-5xl mx-auto justify-between">
        <div className="">
          {cartItems.map((item, i) => (
            <CartProduct item={item} key={i} removeItemFromCart={removeItemFromCart} />
          ))}
        </div>

        <section className="mt-10 border rounded-xl bg-white/50 px-4 py-6 ">
          <h1 className="font-bold text-2xl mb-4  font-gt">Summary</h1>
          <div className="flex items-center justify-between gap-2 mb-16">
            <div className="text-sm space-x-5 space-y-2 text-left">
              <p>Subtotal</p>
              <p className="text-sm">Estimated Delivery & Handling</p>
            </div>
            <div className="text-sm space-y-2 font-semibold text-right">
              <p>₹{calculateTotalPrice(cartItems)}</p>
              <p>Free</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-4 p-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <p>Total</p>
              <p>₹{calculateTotalPrice(cartItems)}</p>
            </div>
            <Link href={"/checkout"} className="flex items-centerw gap-3">
              <Button className="w-full flex items-center gap-2">
                Proceed to buy <ArrowRight size={16} className="mt-1"/>
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
