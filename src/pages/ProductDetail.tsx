
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductTabs from "@/components/ProductTabs";

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  created_at: string;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const { addItem, isLoading: isAddingToCart } = useCart();
  const { toast } = useToast();
  
  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (error) throw error;
      return data as Product;
    },
    enabled: !!productId,
  });

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product) return;
    
    await addItem(product.id);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng của bạn`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 pt-24 pb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 w-64 mb-8 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 w-3/4 rounded"></div>
                <div className="h-6 bg-gray-200 w-1/4 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 w-1/2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-display mb-4">Không Tìm Thấy Sản Phẩm</h1>
          <p className="text-gray-500 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/browse">
            <Button>Quay Lại Trang Sản Phẩm</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate additional showcase images (in a real app, these would come from the database)
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1526045431048-f857369baa09?q=80",
    "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80",
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80",
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumbs */}
        <ProductBreadcrumb productName={product.name} />

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <ProductImageGallery 
            productName={product.name}
            mainImage={product.image}
            images={productImages}
          />

          {/* Product Info */}
          <ProductInfo 
            product={product}
            onAddToCart={handleAddToCart}
            isAddingToCart={isAddingToCart}
          />
        </div>

        {/* Product Tabs */}
        <ProductTabs />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
