import { ReactNode } from "react";
import AddProductForm from "../../components/admin/admin-form";
import Link from "next/link";
import { LogOut, ShoppingBag, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminMenuBar from "@/components/admin/Admin-mobile-hamburger-menu";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <div className="flex">
      <aside className="md:w-60 bg-primary text-white border-r py-2 mr-2 md:flex flex-col px-4 md:min-h-[80vh] justify-between hidden">
        <section>
          <div className="flex justify-between items-center">
            <h3 className="text-center mb-5 mt-2">Admin</h3>
            <LogOut size={16} />
          </div>
          <Link
            href={"/admin/products"}
            className="flex w-full items-center gap-2"
          >
            <Button
              className="flex items-center justify-start gap-2 w-full"
              variant={"ghost"}
            >
              <ShoppingBag size={20} /> Products
            </Button>
          </Link>
          <Link
            href={"/admin/orders"}
            className="flex items-center w-full gap-2"
          >
            <Button
              className="flex items-center justify-start w-full gap-2"
              variant={"ghost"}
            >
              <ShoppingBasket size={20} /> Order
            </Button>
          </Link>
        </section>
        <section>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/" />
              <AvatarFallback className="text-black font-bold capitalize scale-90">
                {session?.user?.email?.toString()[0]}
              </AvatarFallback>
            </Avatar>
            <p>{session?.user?.email?.split("@")[0]}</p>
          </div>
        </section>
      </aside>
      <div className="md:min-h-screen w-full px-5 md:px-10">
        <header className="flex justify-between border-b mb-5 py-3 items-center md:px-10">
          <AdminMenuBar />
          <AddProductForm actionType="add" />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
