import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  created_at: string;
}

interface ProductInfoProps {
  product: Product;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}

const ProductInfo = ({ product, onAddToCart, isAddingToCart }: ProductInfoProps) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'luxury': return 'Cao Cấp';
      case 'classic': return 'Cổ Điển';
      case 'sport': return 'Thể Thao';
      case 'modern': return 'Hiện Đại';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm uppercase">
          {getCategoryLabel(product.category)}
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
        onClick={onAddToCart}
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
  );
};

export default ProductInfo;