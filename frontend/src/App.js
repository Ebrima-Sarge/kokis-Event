import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "@/context/BrandProvider";
import Landing from "@/pages/Landing";
import WorkWithUs from "@/pages/WorkWithUs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BrandProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
          </Routes>
        </BrandProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
