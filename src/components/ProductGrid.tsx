
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const navigate = useNavigate();

  // Fetch products but limit to only 4 for homepage
  const { data: products, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl mb-12 text-center">Featured Timepieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl mb-12 text-center">Featured Timepieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button 
            onClick={() => navigate("/browse")} 
            className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-2"
          >
            View All Watches
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
