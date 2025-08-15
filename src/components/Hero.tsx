import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const Hero = () => {
  return <div className="relative min-h-screen flex items-center bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80')] bg-cover bg-center opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl mb-6 md:text-4xl mx-[111px]">Đồng cho mọi người</h1>
          <p className="text-lg mb-8 text-gray-200">
            Khám phá bộ sưu tập đồng hồ sang trọng của chúng tôi, kết hợp giữa kỹ thuật chế tác truyền thống và thiết kế hiện đại.
          </p>
          <Link to="/browse">
            <Button className="bg-gold-500 hover:bg-gold-600 text-black">
              Khám Phá Bộ Sưu Tập
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};
export default Hero;