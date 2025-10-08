import { Outlet } from "react-router";
import Header from "./components/header";

export default function Layout() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="body h-full bg-neutral-100 overflow-y-auto">
        {/* <div className="m-5 bg-white w-3xl p-5 rounded-xl mx-auto"> */}
        <Outlet />
        {/* </div> */}
      </div>
    </>
  );
}
