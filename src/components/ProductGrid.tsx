
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Classic Chronograph",
    price: 2999,
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80",
  },
  {
    id: 2,
    name: "Elegant Gold",
    price: 3499,
    image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?q=80",
  },
  {
    id: 3,
    name: "Modern Minimalist",
    price: 1999,
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80",
  },
  {
    id: 4,
    name: "Luxury Diamond",
    price: 5999,
    image: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?q=80",
  },
];

const ProductGrid = () => {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl mb-12 text-center">Featured Timepieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
