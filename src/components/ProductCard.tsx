
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
}

const ProductCard = ({ image, name, price }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start gap-2">
        <h3 className="font-display text-lg">{name}</h3>
        <p className="text-gray-600">${price.toLocaleString()}</p>
        <Button variant="outline" className="w-full hover:bg-gold-500 hover:text-white transition-colors">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
