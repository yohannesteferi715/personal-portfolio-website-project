import { Button } from "@/components/Button";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#backend-architecture", label: "Architecture" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#engineering", label: "Engineering" },
  { href: "#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Scroll progress percentage (0 - 100)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }

      // Determine active section
      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    setIsMobileMenuOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isScrolled
          ? "glass-strong py-2.5 sm:py-3 shadow-xl shadow-black/30 border-b border-border/40"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* ── Brand Logo / Monogram Badge ────────────────────────────── */}
        <a
          href="#"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 group cursor-pointer select-none"
          aria-label="Back to top"
        >
          {/* Stylized Monogram Squircle matching Favicon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass border border-primary/30 flex items-center justify-center relative overflow-hidden group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(32,178,166,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent" />
            <span className="font-mono font-extrabold text-sm sm:text-base tracking-wider text-foreground group-hover:text-primary transition-colors z-10">
              YT
            </span>
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
              Yohannes <span className="text-primary font-mono">.</span>
            </span>
            <span className="text-[10px] text-muted-foreground/80 font-mono tracking-widest uppercase">
              Full-Stack & AI
            </span>
          </div>
        </a>

        {/* ── Desktop Floating Island Nav ────────────────────────────── */}
        <div className="hidden lg:flex items-center">
          <div className="glass rounded-full px-2.5 py-1 flex items-center gap-0.5 border border-border/50 shadow-lg shadow-black/10 backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  href={link.href}
                  key={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "bg-primary/20 text-primary font-semibold border border-primary/30 shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Right CTA Button ───────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={scrollToContact}
            className="relative group/btn overflow-hidden rounded-full p-[1px] focus:outline-none cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            {/* Animated neon ring */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-cyan-400 to-highlight rounded-full opacity-80 group-hover/btn:opacity-100 transition-opacity blur-[1px]" />
            <span className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-background/95 text-xs font-semibold text-foreground group-hover/btn:text-primary transition-colors backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Contact Me
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* ── Mobile Hamburger Button ────────────────────────────────── */}
        <button
          className="lg:hidden p-2 text-foreground rounded-xl glass hover:bg-surface/80 transition-colors cursor-pointer border border-border/40"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={22} className="text-primary" /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Reading Scroll Progress Bar across bottom of header ─────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/20 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-primary via-cyan-400 to-highlight transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-strong border-b border-border/50 animate-fade-in shadow-2xl">
          <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 mb-2">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    href={link.href}
                    key={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xs sm:text-sm py-2 px-2.5 sm:px-3 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? "text-primary font-semibold bg-primary/15 border border-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface/60 border border-transparent"
                    }`}
                  >
                    <span className="truncate">{link.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/50 ml-1 flex-shrink-0">0{idx + 1}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border/30">
              <Button className="w-full flex items-center justify-center gap-2" onClick={scrollToContact}>
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
