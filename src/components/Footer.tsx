
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl mb-4">Đồng Hồ</h3>
            <p className="text-gray-400">
              Đồng hồ cao cấp dành cho những người đánh giá cao vẻ đẹp vượt thời gian.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-gold-500 transition-colors">Giới Thiệu</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-gold-500 transition-colors">Sản Phẩm</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-gold-500 transition-colors">Liên Hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Theo Dõi Chúng Tôi</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Đồng Hồ. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
