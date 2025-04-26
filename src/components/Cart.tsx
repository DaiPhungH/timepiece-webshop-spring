
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

export function Cart() {
  const { items, removeItem, updateQuantity } = useCart();
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number, name: string) => {
    updateQuantity(id, quantity);
    toast({
      title: "Quantity Updated",
      description: `${name}'s quantity has been updated to ${quantity}`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. We'll process your order soon.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold-500 text-xs flex items-center justify-center text-white">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1), item.name)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="mt-4 space-y-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <Button 
              className="w-full bg-gold-500 hover:bg-gold-600 h-14 text-base" // Increased height and text size
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
