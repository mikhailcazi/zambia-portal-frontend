import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/page";
import Layout from "./Layout";
import ProjectList from "./pages/projects";
import ProjectForm from "./pages/form";
import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./pages/admin/admin-login";
// import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col">
        {/* <Toaster /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="login" replace />} />
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="form" element={<ProjectForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
