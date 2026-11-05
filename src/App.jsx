import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { Engineering } from "@/sections/Engineering";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { AdminApp } from "@/admin/AdminApp";

const Portfolio = () => (
  <div className="min-h-screen overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Engineering />
      <Testimonials />
      <Contact />
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
