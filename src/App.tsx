import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/page";
import Layout from "./Layout";
import ProjectList from "./pages/projects";
import ProjectForm from "./pages/form";
// import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col">
        {/* <Toaster /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/form" element={<ProjectForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
