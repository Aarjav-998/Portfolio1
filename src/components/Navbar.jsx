import { cn } from "@/lib/utils";
import { Home, User, BarChart2, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero", icon: <Home size={18} /> },
  { name: "About", href: "#about", icon: <Search size={18} /> },
  { name: "Skills", href: "#skills", icon: <BarChart2 size={18} /> },
  { name: "Projects", href: "#projects", icon: <User size={18} /> },
  { name: "Contact", href: "#contact", icon: <User size={18} /> },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setActiveSection(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 flex justify-center top-4 px-4">
      <div
        className={cn(
          "flex items-center space-x-4 px-6 py-2 rounded-full border border-border bg-background/80 backdrop-blur-lg shadow-lg transition-all duration-300",
          isScrolled ? "py-2" : "py-3"
        )}
      >
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer",
                activeSection === item.href
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  : "text-foreground hover:text-primary"
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-background backdrop-blur-lg shadow-lg border-l border-border z-40 flex flex-col items-start justify-center p-8 space-y-6 transform transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {navItems.map((item, key) => (
          <a
            key={key}
            href={item.href}
            onClick={() => handleNavClick(item.href)}
            className={cn(
              "flex items-center gap-3 text-xl px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer w-full",
              activeSection === item.href
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                : "text-foreground hover:text-primary"
            )}
          >
            {item.icon}
            {item.name}
          </a>
        ))}

        {/* Theme Toggle in Mobile Menu */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 text-foreground hover:text-yellow-400 transition-colors duration-300 text-xl"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};
