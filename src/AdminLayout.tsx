import { Outlet } from "react-router";
import Header from "./components/header";

export default function AdminLayout() {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="body h-full bg-neutral-100 justify-items-center overflow-auto">
        <div className="m-5 bg-white w-[calc(100%-40px)] h-[calc(100%-40px)] p-5 rounded-xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
