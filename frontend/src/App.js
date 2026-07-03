import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "@/context/BrandProvider";
import Landing from "@/pages/Landing";
import WorkWithUs from "@/pages/WorkWithUs";
import ShowSecurityServices from "@/pages/showsecurity/Services";
import ShowSecurityEvents from "@/pages/showsecurity/Events";
import ShowSecurityPartners from "@/pages/showsecurity/Partners";
import ShowSecurityHistory from "@/pages/showsecurity/History";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BrandProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/services" element={<ShowSecurityServices />} />
            <Route path="/events" element={<ShowSecurityEvents />} />
            <Route path="/partners" element={<ShowSecurityPartners />} />
            <Route path="/history" element={<ShowSecurityHistory />} />
          </Routes>
        </BrandProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
