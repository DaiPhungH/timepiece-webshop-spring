
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
}

const ProductCard = ({ id, image, name, price }: ProductCardProps) => {
  const { addItem, isLoading } = useCart();

  return (
    <Card className="overflow-hidden group flex flex-col h-full transition-shadow hover:shadow-lg">
      <Link to={`/product/${id}`} className="flex-grow">
        <CardContent className="p-0 flex-grow">
          <div className="aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex flex-col items-start gap-3">
        <div className="w-full flex justify-between items-center">
          <Link to={`/product/${id}`} className="hover:text-gold-500 transition-colors">
            <h3 className="font-display text-lg">{name}</h3>
          </Link>
          <p className="text-gray-600 font-semibold">${price.toLocaleString()}</p>
        </div>
        <Button 
          variant="outline" 
          className="w-full hover:bg-gold-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          onClick={() => addItem(id)}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
