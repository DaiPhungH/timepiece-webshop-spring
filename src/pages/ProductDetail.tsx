
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Eye, ChevronRight, ImageIcon } from "lucide-react";
import { 
  Carousel,
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  const [selectedImage, setSelectedImage] = useState<string>("");
  
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

  // Set the selected image when product data is loaded
  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

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
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang Chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/browse">Sản Phẩm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <div className="space-y-6">
            {/* Main Image Display */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <AspectRatio ratio={1/1}>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            
            {/* Image Carousel */}
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {productImages.map((img, index) => (
                    <CarouselItem key={index} className="basis-1/4 md:basis-1/5">
                      <button
                        onClick={() => setSelectedImage(img)}
                        className={`w-full rounded-md overflow-hidden transition-all ${
                          selectedImage === img ? "ring-2 ring-gold-500" : "hover:opacity-80"
                        }`}
                      >
                        <AspectRatio ratio={1/1}>
                          <img 
                            src={img} 
                            alt={`${product.name} góc nhìn ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 opacity-70 hover:opacity-100" />
                <CarouselNext className="right-0 opacity-70 hover:opacity-100" />
              </Carousel>
            </div>
            
            {/* Expanded View Button */}
            <div className="flex justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Xem Toàn Màn Hình
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-screen max-w-[90vw] p-0" align="center">
                  <div className="p-1">
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="max-h-[80vh] object-contain"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm uppercase">
                {product.category === 'luxury' ? 'Cao Cấp' : 
                 product.category === 'classic' ? 'Cổ Điển' : 
                 product.category === 'sport' ? 'Thể Thao' : 
                 product.category === 'modern' ? 'Hiện Đại' : 
                 product.category}
              </span>
            </div>
            <h1 className="text-4xl font-display">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">{product.price.toLocaleString()} VNĐ</span>
            </div>
            
            <div className="border-t border-b py-6 my-6">
              <p className="text-gray-600">
                Chiếc đồng hồ tinh xảo này thể hiện đỉnh cao của nghề làm đồng hồ. 
                Với kỹ thuật chính xác, vật liệu cao cấp, và thiết kế vượt thời gian, 
                đây là một tuyên bố về sự thanh lịch sẽ nâng tầm bất kỳ trang phục hoặc dịp nào.
              </p>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full md:w-auto px-8 py-6 bg-gold-500 hover:bg-gold-600 text-white"
            >
              {isAddingToCart ? "Đang thêm vào giỏ..." : "Thêm Vào Giỏ Hàng"}
            </Button>

            <div className="flex items-center mt-6 space-x-6">
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-gray-500 text-sm">15 người đang xem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b mb-0 rounded-none bg-transparent">
              <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none">
                Chi Tiết
              </TabsTrigger>
              <TabsTrigger value="specs" className="data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none">
                Thông Số Kỹ Thuật
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none">
                Vận Chuyển & Đổi Trả
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <h3 className="text-xl font-bold mb-4">Chi Tiết Sản Phẩm</h3>
              <p className="mb-4">
                Chiếc đồng hồ cao cấp này đại diện cho đỉnh cao của nghề làm đồng hồ. 
                Kết hợp kỹ thuật truyền thống với đổi mới hiện đại, nó mang đến độ chính xác 
                và phong cách không gì sánh được.
              </p>
              <p>
                Thiết kế thanh lịch có vỏ được cân đối cẩn thận nằm thoải mái trên cổ tay, 
                được bổ sung bằng dây đeo cao cấp được làm từ vật liệu tốt nhất. 
                Mọi chi tiết đều được cân nhắc kỹ lưỡng để tạo ra một chiếc đồng hồ 
                vừa thực dụng vừa đẹp.
              </p>
            </TabsContent>
            <TabsContent value="specs" className="pt-6">
              <h3 className="text-xl font-bold mb-4">Thông Số Kỹ Thuật</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Bộ máy: Tự động Thụy Sĩ</li>
                <li>Vật liệu vỏ: Thép không gỉ 316L</li>
                <li>Khả năng chống nước: 100m</li>
                <li>Đường kính: 40mm</li>
                <li>Độ dày: 11.5mm</li>
                <li>Kính: Sapphire với lớp phủ chống phản chiếu</li>
                <li>Dự trữ năng lượng: 42 giờ</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <h3 className="text-xl font-bold mb-4">Vận Chuyển & Đổi Trả</h3>
              <p className="mb-4">
                Chúng tôi cung cấp dịch vụ vận chuyển toàn cầu với bảo hiểm đầy đủ và theo dõi. Thời gian giao hàng thay đổi theo khu vực:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Bắc Mỹ: 2-3 ngày làm việc</li>
                <li>Châu Âu: 3-5 ngày làm việc</li>
                <li>Châu Á & Châu Đại Dương: 5-7 ngày làm việc</li>
                <li>Các khu vực khác: 7-10 ngày làm việc</li>
              </ul>
              <p>
                Chấp nhận đổi trả trong vòng 30 ngày kể từ ngày giao hàng cho các sản phẩm chưa đeo trong bao bì gốc.
                Vui lòng liên hệ với đội ngũ dịch vụ khách hàng của chúng tôi để bắt đầu việc đổi trả.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
