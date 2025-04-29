
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Watch, Grid2X2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Product categories
const categories = [
  { id: "all", name: "Tất Cả" },
  { id: "luxury", name: "Cao Cấp" },
  { id: "classic", name: "Cổ Điển" },
  { id: "sport", name: "Thể Thao" },
  { id: "modern", name: "Hiện Đại" }
];

// Define the Product interface to match our database schema
interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  created_at: string;
  updated_at: string;
}

const BrowseProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  // Fetch all products
  const { data: products, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Filter and sort products based on active category and search query
  const filteredProducts = products?.filter(product => {
    const matchesCategory = activeCategory === "all" || 
      (product.category && product.category === activeCategory);
    
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortOrder === "price_low") return a.price - b.price;
    if (sortOrder === "price_high") return b.price - a.price;
    if (sortOrder === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortOrder === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <header className="mb-12">
          <h1 className="font-display text-4xl mb-3 text-center">Khám Phá Bộ Sưu Tập</h1>
          <p className="text-center text-gray-500 max-w-2xl mx-auto">
            Khám phá bộ sưu tập đồng hồ tinh tế của chúng tôi, được chế tác với độ chính xác và thiết kế để tạo nên sự thanh lịch.
            Tìm chiếc đồng hồ hoàn hảo để bổ sung cho phong cách của bạn.
          </p>
        </header>
        
        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm đồng hồ..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới Nhất</SelectItem>
                <SelectItem value="oldest">Cũ Nhất</SelectItem>
                <SelectItem value="price_low">Giá: Thấp đến Cao</SelectItem>
                <SelectItem value="price_high">Giá: Cao đến Thấp</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="hidden md:flex border rounded-md">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`h-10 w-10 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setViewMode("list")}
                className={`h-10 w-10 ${viewMode === "list" ? "bg-gray-100" : ""}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
              {isLoading ? (
                // Loading state
                <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-1'} gap-8 mt-8`}>
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className={`h-[400px] bg-gray-200 animate-pulse rounded-lg ${viewMode === 'list' ? 'max-w-full' : ''}`} />
                  ))}
                </div>
              ) : filteredProducts?.length > 0 ? (
                // Products display based on viewMode
                viewMode === "grid" ? (
                  // Grid view
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  // List view
                  <div className="flex flex-col gap-6 mt-8">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="md:w-64 h-64">
                          <Link to={`/product/${product.id}`}>
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </Link>
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <Link to={`/product/${product.id}`}>
                              <h3 className="text-xl font-display mb-2 hover:text-gold-500 transition-colors">{product.name}</h3>
                            </Link>
                            <div className="flex items-center mb-4">
                              <span className="mr-2 text-xs px-2 py-1 bg-gray-100 rounded-full">
                                {product.category}
                              </span>
                              <span className="text-xs text-gray-500">
                                Thêm vào ngày {new Date(product.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-6">
                              Chiếc đồng hồ cao cấp được chế tác với sự chú ý đặc biệt đến từng chi tiết, 
                              với cơ chế chính xác và thiết kế thanh lịch.
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-semibold">{product.price.toLocaleString()} VNĐ</span>
                            <Button 
                              onClick={() => console.log(`Add to cart: ${product.id}`)}
                              className="bg-gold-500 hover:bg-gold-600 text-white"
                            >
                              Thêm vào giỏ
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                // No products found
                <div className="text-center py-20">
                  <Watch className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Không tìm thấy đồng hồ</h3>
                  <p className="text-gray-500">Hãy thử danh mục khác hoặc từ khóa tìm kiếm khác</p>
                </div>
              )}

              {filteredProducts && filteredProducts.length > 0 && (
                <div className="mt-12 text-center text-gray-500">
                  Hiển thị {filteredProducts.length} {filteredProducts.length === 1 ? 'đồng hồ' : 'đồng hồ'}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowseProducts;
