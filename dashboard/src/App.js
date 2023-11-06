import { BrowserRouter, Route, Routes } from "react-router-dom";
import VendorSelection from "./pages/VendorSelection";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VendorSelection />} />
        <Route path="dashboard/:vendorId" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
