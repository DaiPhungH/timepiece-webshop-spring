import { Button } from "./ui/button";
import { Cart } from "./Cart";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-2xl">
          Timepiece
        </a>
        <div className="flex items-center gap-8">
          <a href="/" className="hover:text-gold-500 transition-colors">Home</a>
          <a href="#products" className="hover:text-gold-500 transition-colors">Watches</a>
          <a href="#about" className="hover:text-gold-500 transition-colors">About</a>
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
