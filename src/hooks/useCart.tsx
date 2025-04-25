
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (productId: string) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCartItems = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        products (
          name,
          price,
          image
        )
      `);

    if (error) {
      console.error('Error fetching cart:', error);
      return;
    }

    setItems(data.map(item => ({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      name: item.products.name,
      price: item.products.price,
      image: item.products.image,
    })));
  };

  useEffect(() => {
    fetchCartItems();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchCartItems();
    });

    return () => subscription.unsubscribe();
  }, []);

  const addItem = async (productId: string) => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to cart",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert({ product_id: productId })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Item added to cart",
      });
      fetchCartItems();
    }
    setIsLoading(false);
  };

  const removeItem = async (cartItemId: string) => {
    setIsLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) {
      toast({
        title: "Error",
        description: "Could not remove item from cart",
        variant: "destructive",
      });
    } else {
      fetchCartItems();
    }
    setIsLoading(false);
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    setIsLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId);

    if (error) {
      toast({
        title: "Error",
        description: "Could not update quantity",
        variant: "destructive",
      });
    } else {
      fetchCartItems();
    }
    setIsLoading(false);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
