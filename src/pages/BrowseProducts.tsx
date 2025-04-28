
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Product categories
const categories = [
  { id: "all", name: "All Watches" },
  { id: "luxury", name: "Luxury" },
  { id: "classic", name: "Classic" },
  { id: "sport", name: "Sport" },
  { id: "modern", name: "Modern" }
];

const BrowseProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Filter products based on active category and search query
  const filteredProducts = products?.filter(product => {
    const matchesCategory = activeCategory === "all" || 
      (product.category && product.category === activeCategory);
    
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <h1 className="font-display text-4xl mb-8 text-center">Browse Timepieces</h1>
        
        {/* Search bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search watches..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Category tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mx-auto">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {isLoading ? (
                  // Loading state
                  Array(8).fill(0).map((_, i) => (
                    <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />
                  ))
                ) : filteredProducts?.length > 0 ? (
                  // Products grid
                  filteredProducts.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))
                ) : (
                  // No products found
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No watches found. Try a different category or search term.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowseProducts;
