
import { Toaster } from "@/components/ui/toaster";
import { DataProvider } from "@/context/DataContext";
import Index from "@/pages/Index";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <Toaster />
      <Index />
    </DataProvider>
  );
}

export default App;
