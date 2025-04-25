
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

    try {
      // First get the cart items
      const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select('id, product_id, quantity');
        
      if (cartError) {
        console.error('Error fetching cart:', cartError);
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        setItems([]);
        return;
      }

      // Then get product details for each item
      const cartWithProducts = await Promise.all(cartItems.map(async (item) => {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('name, price, image')
          .eq('id', item.product_id)
          .single();
          
        if (productError) {
          console.error(`Error fetching product ${item.product_id}:`, productError);
          return null;
        }

        return {
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          name: product.name,
          price: product.price,
          image: product.image,
        };
      }));

      setItems(cartWithProducts.filter(Boolean) as CartItem[]);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
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

    try {
      // Make sure to include user_id when inserting a cart item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({ 
          product_id: productId,
          user_id: session.user.id 
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Could not add item to cart",
          variant: "destructive",
        });
        console.error('Error adding item to cart:', error);
      } else {
        toast({
          title: "Success",
          description: "Item added to cart",
        });
        fetchCartItems();
      }
    } catch (error) {
      console.error('Error in addItem:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (cartItemId: string) => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error('Error in removeItem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error('Error in updateQuantity:', error);
    } finally {
      setIsLoading(false);
    }
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
