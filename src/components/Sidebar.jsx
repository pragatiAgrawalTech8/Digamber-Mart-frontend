import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
  ClipboardList,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const SidebarLinks = () => {
  return (
    <div className="space-y-3 mt-6">
      <NavLink
        to="/dashboard/sales"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl p-3 font-semibold ${
            isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-100"
          }`
        }
      >
        <LayoutDashboard />
        Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/add-product"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl p-3 font-semibold ${
            isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-100"
          }`
        }
      >
        <PackagePlus />
        Add Product
      </NavLink>

      <NavLink
        to="/dashboard/products"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl p-3 font-semibold ${
            isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-100"
          }`
        }
      >
        <PackageSearch />
        Products
      </NavLink>

      <NavLink
        to="/dashboard/users"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl p-3 font-semibold ${
            isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-100"
          }`
        }
      >
        <Users />
        Users
      </NavLink>

      <NavLink
        to="/dashboard/orders"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl p-3 font-semibold ${
            isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-100"
          }`
        }
      >
        <ClipboardList />
        Orders
      </NavLink>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-20 w-[300px] h-[calc(100vh-80px)] border-r bg-pink-50 p-6 overflow-y-auto">
        <SidebarLinks />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-24 left-4 z-50">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-8 h-8" />
          </SheetTrigger>

          <SheetContent side="left" className="w-[260px]">
            <SidebarLinks />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;