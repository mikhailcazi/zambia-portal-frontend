import { Outlet } from "react-router";
import AdminHeader from "./components/admin-header";

export default function AdminLayout() {
  return (
    <>
      <div>
        <AdminHeader />
      </div>

      <div className="body h-full bg-neutral-100 overflow-y-auto">
        <div className="m-5 bg-white w-[calc(100%-40px)] p-5 rounded-xl mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
