import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { BackendArchitecture } from "@/sections/BackendArchitecture/BackendArchitecture";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { Engineering } from "@/sections/Engineering";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { AdminApp } from "@/admin/AdminApp";
import { ADMIN_BASE_PATH } from "@/admin/constants";

const Portfolio = () => (
  <div className="min-h-screen overflow-x-hidden flex flex-col justify-between">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <About />
      <BackendArchitecture />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Engineering />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${ADMIN_BASE_PATH}/*`} element={<AdminApp />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
