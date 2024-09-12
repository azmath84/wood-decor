"use server";

import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

type TFormData = {
  title: string;
  price: number;
  colors: string[];
  variants?: string[];
  description?: string | undefined;
  discountedPrice?: number | undefined;
  category?: string | undefined;
  image?: string | undefined;
  isFeatured?: boolean | undefined;
};

const getProducts = async ({ take, skip }: { take: number; skip: number }) => {
  // Add try and catch
  const products = await prisma.product.findMany({
    take,
    skip,
  });
  console.log("🔥🔥🔥", products);
  return products;
};

const getOrders = async ({ take, skip }: { take: number; skip: number }) => {
  const orders = await prisma.order.findMany({
    take,
    skip,
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              image: true,
              title: true,
              slug: true,
              price: true,
            },
          },
        },
      },
    },
  });

  return orders;
};

const addProduct = async (formData: TFormData) => {
  // console.log("Action running ✔✔✔✔");

  try {
    const newProduct = await prisma.product.create({
      data: {
        title: formData.title as string,
        price: formData.price,
        description: formData.description as string,
        slug: (formData.title as string)
          .toLowerCase()
          .trim()
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .replaceAll(" ", "-"),
        category: formData.category as string,
        discountedPrice: formData.discountedPrice,
        image: formData.image as string,
        colors: formData.colors as string[],
        variants: formData.variants as string[],
        isFeatured: formData.isFeatured as boolean,
      },
    });

    // console.log("🔥🔥🔥", newProduct);
  } catch (error) {
    console.error(error);
    return {
      success: "Something went wrong",
      error: error,
    };
  }

  revalidatePath("/admin");
  return {
    success: true,
  };
};

const deleteProduct = async (id: Product["id"]) => {
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/admin");
};

const editProduct = async (id: Product["id"], formData: TFormData) => {
  try {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        title: formData.title as string,
        price: formData.price,
        description: formData.description as string,
        category: formData.category as string,
        discountedPrice: formData.discountedPrice,
        image: formData.image as string,
        colors: formData.colors as string[],
        variants: formData.variants as string[],
        isFeatured: formData.isFeatured as boolean,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: "Something went wrong",
      error: error,
    };
  }

  revalidatePath("/admin");
  return {
    success: true,
  };
};

export { addProduct, deleteProduct, editProduct, getProducts, getOrders };
