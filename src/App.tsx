import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/home";
import Layout from "./Layout";
import ProjectList from "./pages/projects";
import ProjectForm from "./pages/form";
import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./pages/admin/admin-login";
import { ProposalDetails } from "./pages/admin/proposal-details";
import ProtectedRoute from "./lib/protected-route";
import { ProjectDetails } from "./pages/project-details";
import { Submission } from "./pages/submission";
import { UserLoginForm } from "./pages/user/user-login";
import { UserRegister } from "./pages/user/user-register-form";
import { UserVerify } from "./pages/user/user-verify";
import { UserRegisterSuccess } from "./pages/user/user-register-success";
import UserHome from "./pages/user/user-home";
import ProposalLandingPage from "./pages/submit-proposal";
import UserProfile from "./pages/user/user-profile";
import UserProposals from "./pages/user/user-proposals";
// import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col">
        {/* <Toaster /> */}
        <BrowserRouter>
          <Routes>
            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="proposals/:id" element={<ProposalDetails />} />
              </Route>
            </Route>
            {/* USER ROUTES */}
            <Route path="/user" element={<Layout />}>
              <Route path="login" element={<UserLoginForm />} />
              <Route path="register">
                <Route index element={<UserRegister />} />
                <Route path="success" element={<UserRegisterSuccess />} />
              </Route>
              <Route path="verify-email" element={<UserVerify />} />
              <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
                <Route path="home" element={<UserHome />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="proposals" element={<UserProposals />} />
              </Route>
            </Route>
            {/* OPEN ROUTES */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
              <Route path="proposals/:id" element={<ProposalDetails />} />
              <Route
                path="submit-your-proposal"
                element={<ProposalLandingPage />}
              />
              <Route path="form" element={<ProjectForm />} />
              <Route path="submitted" element={<Submission />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
