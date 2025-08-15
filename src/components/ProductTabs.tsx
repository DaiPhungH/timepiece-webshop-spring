import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const ProductTabs = () => {
  return (
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
  );
};

export default ProductTabs;