
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { DataProvider } from "@/context/DataContext";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Companies from "@/pages/Companies";
import Contacts from "@/pages/Contacts";
import Deals from "@/pages/Deals";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/companies" element={<DashboardLayout><Companies /></DashboardLayout>} />
          <Route path="/contacts" element={<DashboardLayout><Contacts /></DashboardLayout>} />
          <Route path="/deals" element={<DashboardLayout><Deals /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
